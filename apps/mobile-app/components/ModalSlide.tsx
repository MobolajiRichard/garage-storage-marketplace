import {
  Modal,
  View,
  TouchableWithoutFeedback,
  useWindowDimensions,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useEffect, useCallback, useState, memo } from 'react';
import { BlurView } from 'expo-blur';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
  runOnJS,
  cancelAnimation,
} from 'react-native-reanimated';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { twMerge } from 'tailwind-merge';
import Toast from 'react-native-toast-message';

interface ModalSlideProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  backgroundColor?: string;
  line?: boolean;
  containerClassName?: string;
  topOffset?: number; // Optional prop for top offset
}

// Platform specific values for better experience on each OS
const BLUR_INTENSITY = Platform.select({ ios: 25, android: 15 }) ?? 15;
const ANIMATION_DURATION = Platform.select({ ios: 400, android: 350 }) ?? 380;
const ANIMATION_CLOSE_DURATION = Platform.select({ ios: 500, android: 450 }) ?? 480;

const ModalSlide = ({
  visible,
  onClose,
  children,
  backgroundColor,
  line = true,
  containerClassName,
  topOffset = 50,
}: ModalSlideProps) => {
  const { height } = useWindowDimensions();
  const [contentVisible, setContentVisible] = useState(false);

  // Shared values for animations
  const translateY = useSharedValue(height);
  const blurOpacity = useSharedValue(0);
  const startY = useSharedValue(0);

  // Better animation configurations for smoother transitions
  const appearConfig = {
    duration: ANIMATION_DURATION,
    easing: Easing.bezier(0.25, 0.1, 0.25, 1), // Smooth cubic bezier curve
  };

  const closeConfig = {
    duration: ANIMATION_CLOSE_DURATION,
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  };

  // Optimization: Cancel any running animations when component unmounts
  useEffect(() => {
    return () => {
      cancelAnimation(translateY);
      cancelAnimation(blurOpacity);
    };
  }, [translateY, blurOpacity]);

  // Safe close function with animation
  const handleClose = useCallback(() => {
    // Start close animation
    blurOpacity.value = withTiming(0, closeConfig);
    translateY.value = withTiming(height, closeConfig, () => {
      // Call onClose callback after animation is complete
      runOnJS(onClose)();
      runOnJS(setContentVisible)(false);
    });
  }, [onClose, height, closeConfig, blurOpacity, translateY]);

  useEffect(() => {
    if (visible) {
      // Make content visible immediately, but it will still be off-screen
      setContentVisible(true);

      // Delay the animation slightly to ensure content is ready
      const animationTimer = setTimeout(
        () => {
          // Smooth entrance animation
          blurOpacity.value = withTiming(1, {
            duration: ANIMATION_DURATION + 50, // Slightly longer for blur
            easing: Easing.bezier(0.22, 1, 0.36, 1),
          });
          translateY.value = withTiming(0, appearConfig);
        },
        Platform.OS === 'ios' ? 10 : 20
      ); // Slightly longer delay on Android

      return () => clearTimeout(animationTimer);
    }
  }, [visible, height, appearConfig, blurOpacity, translateY]);

  // Create a pan gesture using the modern Gesture API
  const panGesture = Gesture.Pan()
    .onStart(() => {
      // Store the current position as the starting point
      startY.value = translateY.value;
    })
    .onUpdate(event => {
      // Only allow downward dragging
      if (event.translationY > 0) {
        translateY.value = startY.value + event.translationY;

        // Adjust blur opacity with smoother falloff
        blurOpacity.value = Math.max(0, 1 - translateY.value / 300);
      }
    })
    .onEnd(event => {
      if (translateY.value > 120 || event.velocityY > 500) {
        // Smooth close animation when user swipes down
        translateY.value = withTiming(height, {
          duration: ANIMATION_CLOSE_DURATION,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        });
        blurOpacity.value = withTiming(
          0,
          {
            duration: ANIMATION_CLOSE_DURATION,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          },
          () => {
            // Call onClose callback after animation is complete
            runOnJS(handleClose)();
          }
        );
      } else {
        // Spring back to original position with more natural bouncing
        translateY.value = withSpring(0, {
          damping: Platform.OS === 'ios' ? 18 : 16,
          stiffness: Platform.OS === 'ios' ? 120 : 130,
          mass: 1,
          overshootClamping: false,
          restDisplacementThreshold: 0.01,
          restSpeedThreshold: 2,
        });
        blurOpacity.value = withTiming(1, {
          duration: 200,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        });
      }
    });

  // Animated styles
  const slideStyle = useAnimatedStyle(
    () => ({
      transform: [{ translateY: translateY.value }],
      maxHeight: height - topOffset, // topOffset space for the top
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      backgroundColor: backgroundColor ?? 'white',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 5,
    }),
    [height]
  );

  const blurStyle = useAnimatedStyle(() => ({
    opacity: blurOpacity.value,
  }));

  if (!visible && !contentVisible) {
    return null;
  }

  return (
    <Modal transparent visible={visible} animationType="none" statusBarTranslucent>
      <GestureHandlerRootView className="flex-1">
        <Animated.View style={blurStyle} className="absolute left-0 top-0 h-full w-full flex-1">
          <BlurView
            intensity={BLUR_INTENSITY}
            tint="dark"
            experimentalBlurMethod={Platform.OS === 'android' ? 'dimezisBlurView' : undefined}
            style={{ flex: 1 }}
          >
            <TouchableWithoutFeedback onPress={handleClose}>
              <View className="flex-1" />
            </TouchableWithoutFeedback>
          </BlurView>
        </Animated.View>

        <View className="absolute bottom-0 left-0 right-0 overflow-hidden">
          <GestureDetector gesture={panGesture}>
            <Animated.View style={slideStyle}>
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
              >
                {line && (
                  <View className="items-center pb-1 pt-3">
                    <View className="h-1 w-24 rounded-full bg-gray-300" />
                  </View>
                )}
                <View className={twMerge('px-4', containerClassName)}>
                  {contentVisible && children}
                </View>
              </KeyboardAvoidingView>
            </Animated.View>
          </GestureDetector>
        </View>
      </GestureHandlerRootView>
      <Toast />
    </Modal>
  );
};

// Memoize to prevent unnecessary re-renders
export default memo(ModalSlide);

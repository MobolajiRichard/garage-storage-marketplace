import React, { ReactNode } from 'react';
import { Text, ActivityIndicator, Pressable } from 'react-native';
import { twMerge } from 'tailwind-merge';

export type ButtonVariant = 'primary' | 'secondary' | 'link' | 'destructive' | 'white';

type ButtonProps = {
  text?: string;
  children?: ReactNode;
  onPress?: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  textClassName?: string;
};

const BUTTON_VARIANTS = {
  primary: {
    button: 'bg-primary',
    text: 'text-white',
  },
  secondary: {
    button: 'bg-gray-400',
    text: 'text-black',
  },
  link: {
    button: 'bg-transparent border-b border-primary w-fit p-0 rounded-none min-h-fit',
    text: 'text-primary',
  },
  destructive: {
    button: 'bg-red-500',
    text: 'text-white',
  },
  white: {
    button: 'bg-white',
    text: 'text-black',
  },
};

const Button = ({
  text,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  className,
  textClassName,
  children,
}: ButtonProps) => {
  const variantStyles = BUTTON_VARIANTS[variant] || BUTTON_VARIANTS.primary;

  const baseButtonClasses =
    'flex flex-row items-center justify-center p-5 rounded-2xl w-full min-h-[50px]';
  const disabledClasses = disabled ? 'opacity-50' : '';

  const baseTextClasses = 'text-center font-semibold';

  const buttonClasses = twMerge(
    baseButtonClasses,
    variantStyles.button,
    disabledClasses,
    className
  );

  const textClasses = twMerge(baseTextClasses, variantStyles.text, textClassName);

  return (
    <Pressable
      onPress={loading ? undefined : onPress}
      disabled={disabled || loading}
      className={buttonClasses}
      android_ripple={{
        color: variant === 'primary' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
        borderless: false,
      }}
      style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
    >
      {children ? (
        <React.Fragment>
          {children}
          {loading && (
            <ActivityIndicator
              size="small"
              color={variant === 'primary' ? '#FFFFFF' : '#FF3B58'}
              style={{ position: 'absolute' }}
            />
          )}
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Text className={textClasses} style={{ opacity: loading ? 0 : 1 }}>
            {text || ' '}
          </Text>
          {loading && (
            <ActivityIndicator
              size="small"
              color={variant === 'primary' ? '#FFFFFF' : '#FF3B58'}
              style={{ position: 'absolute' }}
            />
          )}
        </React.Fragment>
      )}
    </Pressable>
  );
};

export default Button;

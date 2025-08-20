import { EvilIcons } from "@expo/vector-icons";
import * as DropdownMenuPrimitive from "@rn-primitives/dropdown-menu";
import * as React from "react";
import {
  Platform,
  type StyleProp,
  StyleSheet,
  type ViewStyle,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import { twMerge } from "tailwind-merge";

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubContent = React.forwardRef<
  DropdownMenuPrimitive.SubContentRef,
  DropdownMenuPrimitive.SubContentProps
>(({ className, ...props }, ref) => {
  const { open } = DropdownMenuPrimitive.useSubContext();
  return (
    <DropdownMenuPrimitive.SubContent
      ref={ref}
      className={twMerge(
        "border-border bg-popover shadow-foreground/5 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 mt-1 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-md",
        open
          ? "web:animate-in web:fade-in-0 web:zoom-in-95"
          : "web:animate-out web:fade-out-0 web:zoom-out",
        className
      )}
      {...props}
    />
  );
});
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = React.forwardRef<
  DropdownMenuPrimitive.ContentRef,
  DropdownMenuPrimitive.ContentProps & {
    overlayStyle?: StyleProp<ViewStyle>;
    overlayClassName?: string;
    portalHost?: string;
  }
>(
  (
    { className, overlayClassName, overlayStyle, portalHost, ...props },
    ref
  ) => {
    const { open } = DropdownMenuPrimitive.useRootContext();
    return (
      <DropdownMenuPrimitive.Portal hostName={portalHost}>
        <DropdownMenuPrimitive.Overlay
          style={[
            overlayStyle
              ? StyleSheet.flatten([
                  Platform.OS !== "web" ? StyleSheet.absoluteFill : undefined,
                  overlayStyle,
                ])
              : Platform.OS !== "web"
                ? StyleSheet.absoluteFill
                : undefined,
            {
              shadowColor: "#0D0D0D",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 15,
              elevation: 5,
            },
          ]}
          className={overlayClassName}
        >
          <DropdownMenuPrimitive.Content
            ref={ref}
            className={twMerge(
              "web:data-[side=bottom]:slide-in-from-top-2 web:data-[side=left]:slide-in-from-right-2 web:data-[side=right]:slide-in-from-left-2 web:data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-[15px] bg-white p-[10px] shadow-black drop-shadow-2xl",
              open
                ? "web:animate-in web:fade-in-0 web:zoom-in-95"
                : "web:animate-out web:fade-out-0 web:zoom-out-95",
              className
            )}
            {...props}
          />
        </DropdownMenuPrimitive.Overlay>
      </DropdownMenuPrimitive.Portal>
    );
  }
);
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef<
  DropdownMenuPrimitive.ItemRef,
  DropdownMenuPrimitive.ItemProps & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={twMerge(
      "web:cursor-default native:py-2 web:outline-none web:focus:bg-accent active:bg-accent web:hover:bg-accent group relative flex flex-row items-center gap-2 rounded-sm px-2 py-1.5",
      inset && "pl-8",
      props.disabled && "web:pointer-events-none opacity-50",
      className
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

// Add the DropdownButton component
type DropdownButtonProps = {
  text: string;
  className?: string;
  textClassName?: string;
  iconColor?: string;
  onPress?: () => void;
};

const DropdownButton = React.forwardRef<
  React.ElementRef<typeof TouchableOpacity>,
  DropdownButtonProps
>(
  (
    {
      text,
      className = "",
      textClassName = "",
      iconColor = "#0D0D0D",
      onPress,
    },
    ref
  ) => {
    return (
      <TouchableOpacity
        ref={ref}
        className={`h-[55px] flex-row items-center justify-between rounded-2xl border border-gray-400 bg-white p-4 ${className}`}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <Text className={`text-base ${textClassName}`}>{text}</Text>
        <View className="size-5">
          <EvilIcons name="chevron-down" size={20} color={iconColor} />
        </View>
      </TouchableOpacity>
    );
  }
);

DropdownButton.displayName = "DropdownButton";

// Reusable dropdown trigger button component that works with DropdownMenuTrigger
type DropdownTriggerButtonProps = {
  text: string;
  className?: string;
  textClassName?: string;
  iconColor?: string;
};

function DropdownTriggerButton({
  text,
  className = "",
  textClassName = "",
  iconColor = "#0D0D0D",
}: DropdownTriggerButtonProps) {
  return (
    <DropdownMenuTrigger asChild>
      <TouchableOpacity
        className={twMerge(
          "h-[55px] w-full flex-row items-center justify-between rounded-2xl border border-gray-400 bg-white p-4",
          className
        )}
      >
        <Text className={twMerge("w-auto min-w-24 text-base", textClassName)}>
          {text}
        </Text>
        <View className="size-5">
          <EvilIcons name="chevron-down" size={20} color={iconColor} />
        </View>
      </TouchableOpacity>
    </DropdownMenuTrigger>
  );
}

export {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
  DropdownButton,
  DropdownTriggerButton,
};

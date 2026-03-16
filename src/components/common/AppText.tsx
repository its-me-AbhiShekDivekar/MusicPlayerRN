import React from "react";
import { Text, TextProps } from "react-native";
import { useAppTheme } from "../../hooks/useAppTheme";

interface AppTextProps extends TextProps {
  variant?: "header" | "subheader" | "body" | "caption";
  customColor?: string;
}

export const AppText = ({
  style,
  variant = "body",
  customColor,
  ...props
}: AppTextProps) => {
  const { theme, typography } = useAppTheme();
  return (
    <Text
      style={[typography[variant], { color: customColor || theme.text }, style]}
      {...props}
    />
  );
};

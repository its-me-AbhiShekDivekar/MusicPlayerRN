import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, ViewStyle } from "react-native";
import { useAppTheme } from "../../hooks/useAppTheme";
import { AppText } from "./AppText";

interface AppButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "danger" | "outline";
  icon?: keyof typeof Ionicons.glyphMap;
  style?: ViewStyle;
}

export const AppButton = ({
  title,
  onPress,
  variant = "primary",
  icon,
  style,
}: AppButtonProps) => {
  const { theme, spacing } = useAppTheme();

  // Determine background color based on variant
  const getBgColor = () => {
    if (variant === "danger") return theme.danger;
    if (variant === "outline") return "transparent";
    return theme.primary;
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: getBgColor(),
          paddingVertical: spacing.small,
          paddingHorizontal: spacing.medium,
          borderColor: variant === "outline" ? theme.border : "transparent",
          borderWidth: variant === "outline" ? 1 : 0,
        },
        pressed && styles.pressed,
        style,
      ]}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={20}
          color={variant === "outline" ? theme.text : "#FFF"}
          style={{ marginRight: spacing.small }}
        />
      )}
      <AppText
        variant="body"
        style={{
          color: variant === "outline" ? theme.text : "#FFF",
          fontWeight: "600",
        }}
      >
        {title}
      </AppText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.7,
  },
});

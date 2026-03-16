import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { useAppTheme } from "../../hooks/useAppTheme";

interface AppCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const AppCard = ({ children, style }: AppCardProps) => {
  const { theme, spacing, isDark } = useAppTheme();
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.cardBackground,
          padding: spacing.medium,
          marginBottom: spacing.medium,
          borderWidth: isDark ? 1 : 0,
          borderColor: theme.border,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
});

import React from "react";
import { StyleSheet, View } from "react-native";
import { useAppTheme } from "../../hooks/useAppTheme";
import { AppText } from "./AppText";

interface AppHeaderProps {
  title: string;
  rightElement?: React.ReactNode;
}

export const AppHeader = ({ title, rightElement }: AppHeaderProps) => {
  const { theme, spacing, insets } = useAppTheme();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
          paddingHorizontal: spacing.medium,
          paddingTop: Math.max(insets.top, spacing.medium),
          paddingBottom: spacing.medium,
          borderBottomWidth: 1,
          borderBottomColor: theme.border,
        },
      ]}
    >
      <AppText variant="header">{title}</AppText>
      {rightElement && <View>{rightElement}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

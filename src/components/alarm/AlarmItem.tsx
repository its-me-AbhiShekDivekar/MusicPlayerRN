import React from "react";
import { StyleSheet, Switch, View } from "react-native";
import { useAppTheme } from "../../hooks/useAppTheme";
import { AlarmType } from "../../types/alarmTypes";
import { AppButton } from "../common/AppButton";
import { AppCard } from "../common/AppCard";
import { AppText } from "../common/AppText";

interface AlarmItemProps {
  alarm: AlarmType;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const AlarmItem = ({ alarm, onToggle, onDelete }: AlarmItemProps) => {
  const { theme, spacing } = useAppTheme();

  // Format the ISO string into a readable time (e.g., 07:30 AM)
  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <AppCard style={styles.card}>
      <View style={styles.content}>
        <View style={styles.timeContainer}>
          <AppText variant="header">{formatTime(alarm.time)}</AppText>
          <AppText variant="caption" customColor={theme.textSecondary}>
            {alarm.label}
          </AppText>
        </View>

        <Switch
          value={alarm.isActive}
          onValueChange={() => onToggle(alarm.id)}
          trackColor={{ false: theme.border, true: theme.primary }}
          thumbColor="#FFF"
        />
      </View>

      <View style={[styles.footer, { marginTop: spacing.small }]}>
        <AppButton
          title="Delete"
          variant="danger"
          icon="trash-outline"
          onPress={() => onDelete(alarm.id)}
          style={styles.deleteBtn}
        />
      </View>
    </AppCard>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timeContainer: {
    flex: 1,
  },
  footer: {
    alignItems: "flex-end",
  },
  deleteBtn: {
    paddingVertical: 6, // Make it a bit more compact
    paddingHorizontal: 12,
  },
});

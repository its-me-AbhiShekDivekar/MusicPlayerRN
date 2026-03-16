import DateTimePicker, {
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import { Modal, Platform, Pressable, StyleSheet, View } from "react-native";
import { useAppTheme } from "../../hooks/useAppTheme";
import { RepeatInterval } from "../../types/alarmTypes";
import { AppButton } from "../common/AppButton";
import { AppText } from "../common/AppText";

interface DatePickerModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: (date: Date, repeat: RepeatInterval) => void;
}

export const DatePickerModal = ({
  isVisible,
  onClose,
  onConfirm,
}: DatePickerModalProps) => {
  const { theme, spacing } = useAppTheme();

  // State for the flow
  const [mode, setMode] = useState<"date" | "time">("date");
  const [showPicker, setShowPicker] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());
  const [repeat, setRepeat] = useState<RepeatInterval>("none");

  // Sync internal picker visibility with modal visibility
  useEffect(() => {
    if (isVisible) {
      setShowPicker(Platform.OS === "android"); // Android starts with native dialog
      setMode("date");
    }
  }, [isVisible]);

  const onHandleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    // Android: User cancelled
    if (event.type === "dismissed" && Platform.OS === "android") {
      setShowPicker(false);
      onClose();
      return;
    }

    if (selectedDate) {
      const currentDate = selectedDate;

      if (Platform.OS === "android") {
        setShowPicker(false); // Hide current dialog

        if (mode === "date") {
          setTempDate(currentDate);
          // Small timeout to ensure the Date dialog is fully closed before showing Time
          setTimeout(() => {
            setMode("time");
            setShowPicker(true);
          }, 100);
        } else {
          // Time picked, now show the Repeat Selection Modal
          setTempDate(currentDate);
        }
      } else {
        // iOS handled via state since it's a spinner
        setTempDate(currentDate);
      }
    }
  };

  const handleFinalConfirm = () => {
    onConfirm(tempDate, repeat);
  };

  const intervals: { label: string; value: RepeatInterval }[] = [
    { label: "Once", value: "none" },
    { label: "Daily", value: "daily" },
    { label: "Every 2m", value: "2min" },
  ];

  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View
          style={[
            styles.container,
            { backgroundColor: theme.cardBackground, padding: spacing.large },
          ]}
        >
          <AppText variant="subheader" style={{ textAlign: "center" }}>
            Configure Alarm
          </AppText>

          {/* iOS View: Always shows the combined picker (iOS supports 'datetime') */}
          {Platform.OS === "ios" && (
            <DateTimePicker
              value={tempDate}
              mode="datetime"
              display="spinner"
              onChange={onHandleChange}
              textColor={theme.text}
              minimumDate={new Date()}
            />
          )}

          {/* Android Logic: Triggered via the sequence state */}
          {Platform.OS === "android" && showPicker && (
            <DateTimePicker
              value={tempDate}
              mode={mode}
              is24Hour={false}
              display="default"
              onChange={onHandleChange}
              minimumDate={new Date()}
            />
          )}

          <AppText variant="body" style={{ marginTop: spacing.medium }}>
            Repeat Settings:
          </AppText>
          <View style={styles.repeatRow}>
            {intervals.map((i) => (
              <Pressable
                key={i.value}
                onPress={() => setRepeat(i.value)}
                style={[
                  styles.chip,
                  {
                    backgroundColor:
                      repeat === i.value ? theme.primary : theme.border,
                  },
                ]}
              >
                <AppText style={{ color: "#FFF" }}>{i.label}</AppText>
              </Pressable>
            ))}
          </View>

          <View style={styles.actions}>
            <AppButton
              title="Cancel"
              variant="outline"
              onPress={onClose}
              style={{ flex: 1, marginRight: 8 }}
            />
            <AppButton
              title={
                Platform.OS === "android" && mode === "date"
                  ? "Pick Time"
                  : "Set Alarm"
              }
              onPress={
                Platform.OS === "android" && mode === "date"
                  ? () => setShowPicker(true)
                  : handleFinalConfirm
              }
              style={{ flex: 1 }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: { width: "90%", borderRadius: 20 },
  repeatRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 15,
    gap: 5,
  },
  chip: { padding: 8, borderRadius: 10 },
  actions: { flexDirection: "row" },
});

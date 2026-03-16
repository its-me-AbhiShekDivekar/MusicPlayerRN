import { AlarmItem } from "@/src/components/alarm/AlarmItem";
import { DatePickerModal } from "@/src/components/alarm/DatePickerModal";
import { AppButton } from "@/src/components/common/AppButton";
import { AppHeader } from "@/src/components/common/AppHeader";
import { useAlarms } from "@/src/hooks/useAlarms";
import { useAppTheme } from "@/src/hooks/useAppTheme";
import { RepeatInterval } from "@/src/types/alarmTypes";
import React, { useState } from "react";
import { FlatList, View } from "react-native";

export default function AlarmScreen() {
  const { theme, spacing, insets } = useAppTheme();
  const { alarms, addAlarm, deleteAlarm } = useAlarms();
  const [isModalVisible, setModalVisible] = useState(false);

  const handleConfirmAlarm = (selectedDate: Date, repeat: RepeatInterval) => {
    addAlarm(selectedDate, "Alarm", repeat);
    setModalVisible(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <AppHeader
        title="Alarms"
        rightElement={
          <AppButton
            title="Add"
            icon="add"
            onPress={() => setModalVisible(true)}
          />
        }
      />

      <FlatList
        data={alarms}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          padding: spacing.medium,
          paddingBottom: insets.bottom,
        }}
        renderItem={({ item }) => (
          <AlarmItem alarm={item} onToggle={() => {}} onDelete={deleteAlarm} />
        )}
      />

      <DatePickerModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleConfirmAlarm}
      />
    </View>
  );
}

import notifee, {
    AndroidImportance,
    RepeatFrequency,
    TimestampTrigger,
    TriggerType,
} from "@notifee/react-native";
import { AlarmType } from "../types/alarmTypes";

export const notificationService = {
  scheduleAlarm: async (alarm: AlarmType) => {
    // 1. Create Channel with Custom Sound
    const channelId = await notifee.createChannel({
      id: "AlarmChannel",
      name: "Alarms",
      importance: AndroidImportance.HIGH,
      sound: "alarm_sound", // Manual: res/raw/alarm_sound.wav
    });

    // 2. Define Exact Trigger
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: new Date(alarm.time).getTime(),
      alarmManager: true, // Requires SCHEDULE_EXACT_ALARM
      repeatFrequency:
        alarm.repeat === "daily"
          ? RepeatFrequency.DAILY
          : alarm.repeat === "weekly"
            ? RepeatFrequency.WEEKLY
            : undefined,
    };

    // 3. Display Notification
    await notifee.createTriggerNotification(
      {
        id: alarm.id,
        title: "Alarm",
        body: alarm.label,
        android: {
          channelId,
          importance: AndroidImportance.HIGH,
          sound: "alarm_sound",
          pressAction: { id: "default" },
        },
        ios: {
          critical: true,
          sound: "alarm_sound.wav", // Added to Xcode bundle
          criticalVolume: 1.0,
        },
      },
      trigger,
    );
  },

  cancelAlarm: async (id: string) => {
    await notifee.cancelNotification(id);
  },
};

import notifee, {
  AndroidImportance,
  AndroidNotificationSetting,
  TimestampTrigger,
  TriggerType,
} from "@notifee/react-native";

/**
 * Create Android notification channel
 */
export async function createAlarmChannel() {
  await notifee.createChannel({
    id: "alarm",
    name: "Alarm Channel",
    importance: AndroidImportance.HIGH,
  });
}

export async function setupNotifications() {
  // 1. Request basic notification permission
  await notifee.requestPermission();

  // 2. Handle Exact Alarm permission for Android
  const settings = await notifee.getNotificationSettings();
  if (settings.android.alarm === AndroidNotificationSetting.DISABLED) {
    // Correct API function name
    await notifee.openAlarmPermissionSettings();
  }
}

/**
 * Schedule alarm notification
 */
export async function scheduleAlarm(timestamp: number) {
  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: timestamp,
  };

  await notifee.createTriggerNotification(
    {
      title: "Alarm",
      body: "Wake up!",
      android: {
        channelId: "alarm",
        pressAction: {
          id: "default",
        },
      },
    },
    trigger,
  );
}

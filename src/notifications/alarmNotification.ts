import notifee, {
    AndroidImportance,
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

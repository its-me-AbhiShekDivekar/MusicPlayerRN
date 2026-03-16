import notifee, { EventType } from "@notifee/react-native";
import messaging from "@react-native-firebase/messaging";
import { alarmStorage } from "./src/storage/alarmStorage";

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log("FCM Background:", remoteMessage);
});

notifee.onBackgroundEvent(async ({ type, detail }) => {
  const { notification } = detail;
  if (type === EventType.DELIVERED || type === EventType.PRESS) {
    if (notification?.id) {
      const alarms = alarmStorage.getAllAlarms();
      const target = alarms.find((a) => a.id === notification.id);

      if (target && target.repeat === "none") {
        const updated = alarms.filter((a) => a.id !== notification.id);
        alarmStorage.saveAlarms(updated);
      }
    }
  }
});

import "expo-router/entry";

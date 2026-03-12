import messaging from "@react-native-firebase/messaging";

/**
 * Background notification handler
 */
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log("Background message:", remoteMessage);
  let count = 0;
  setInterval(() => {
    count++;
    console.log("Background task running...", count);
  }, 1000);
});

/**
 * Start Expo Router
 */
import "expo-router/entry";

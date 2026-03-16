import messaging, {
  FirebaseMessagingTypes,
} from "@react-native-firebase/messaging";
import { PermissionsAndroid, Platform } from "react-native";

/**
 * Request notification permission
 */
export async function requestNotificationPermission(): Promise<void> {
  if (Platform.OS === "android" && Platform.Version >= 33) {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
  }

  const authStatus = await messaging().requestPermission();

  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log("Notification permission granted");
  }
}

/**
 * Get FCM token
 */
export async function getFCMToken(): Promise<string | null> {
  let apn = await messaging().getAPNSToken();
  const token = await messaging().getToken();
  console.log("FCM Token:", token);
  return token;
}

/**
 * Foreground notification listener
 */
export function foregroundNotificationListener() {
  return messaging().onMessage(
    async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
      console.log("Foreground notification:", remoteMessage);
    },
  );
}

/**
 * Notification opened from background
 */
export function notificationOpenedListener() {
  return messaging().onNotificationOpenedApp(
    (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
      console.log("Notification opened from background:", remoteMessage);
    },
  );
}

/**
 * App opened from quit state
 */
export async function checkInitialNotification(): Promise<void> {
  const remoteMessage = await messaging().getInitialNotification();

  if (remoteMessage) {
    console.log("Notification opened from quit state:", remoteMessage);
  }
}

/**
 * Token refresh listener
 */
export function tokenRefreshListener() {
  return messaging().onTokenRefresh((token: string) => {
    console.log("New FCM Token:", token);
  });
}

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  checkInitialNotification,
  foregroundNotificationListener,
  getFCMToken,
  notificationOpenedListener,
  requestNotificationPermission,
  tokenRefreshListener,
} from "@/src/utils/firebaseNotification";
import { useEffect } from "react";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    requestNotificationPermission();
    getFCMToken();

    const unsubscribeForeground = foregroundNotificationListener();
    const unsubscribeOpened = notificationOpenedListener();
    const unsubscribeToken = tokenRefreshListener();

    checkInitialNotification();

    return () => {
      unsubscribeForeground();
      unsubscribeOpened();
      unsubscribeToken();
    };
  }, []);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

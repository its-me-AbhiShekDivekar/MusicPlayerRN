import { Button, View } from "react-native";
import { scheduleAlarm } from "../../src/notifications/alarmNotification";

export default function TestAlarm() {
  const setAlarm = async () => {
    const time = Date.now() + 30000; // 10 seconds later
    await scheduleAlarm(time);
  };

  return (
    <View style={{ marginTop: 100 }}>
      <Button title="Set Alarm (10s)" onPress={setAlarm} />
    </View>
  );
}

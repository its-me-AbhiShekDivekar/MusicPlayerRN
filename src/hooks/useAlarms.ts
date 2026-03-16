import notifee, { EventType } from "@notifee/react-native";
import { useCallback, useEffect, useState } from "react";
import { notificationService } from "../notifications/notificationService";
import { alarmStorage } from "../storage/alarmStorage";
import { AlarmType, RepeatInterval } from "../types/alarmTypes";

export const useAlarms = () => {
  const [alarms, setAlarms] = useState<AlarmType[]>([]);

  const refresh = useCallback(() => setAlarms(alarmStorage.getAllAlarms()), []);

  useEffect(() => {
    const saved = alarmStorage.getAllAlarms();
    const now = new Date();
    const valid = saved.filter(
      (a) => a.repeat !== "none" || new Date(a.time) > now,
    );
    setAlarms(valid);
    alarmStorage.saveAlarms(valid);

    return notifee.onForegroundEvent(({ type }) => {
      if (type === EventType.DELIVERED) refresh();
    });
  }, [refresh]);

  const addAlarm = async (
    time: Date,
    label: string,
    repeat: RepeatInterval,
  ) => {
    const newAlarm: AlarmType = {
      id: Date.now().toString(),
      time: time.toISOString(),
      label,
      isActive: true,
      repeat,
    };
    const updated = [...alarms, newAlarm];
    setAlarms(updated);
    alarmStorage.saveAlarms(updated);
    await notificationService.scheduleAlarm(newAlarm);
  };

  const deleteAlarm = async (id: string) => {
    const updated = alarms.filter((a) => a.id !== id);
    setAlarms(updated);
    alarmStorage.saveAlarms(updated);
    await notificationService.cancelAlarm(id);
  };

  return { alarms, addAlarm, deleteAlarm };
};

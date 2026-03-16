import { createMMKV } from "react-native-mmkv";
import { AlarmType } from "../types/alarmTypes";

export const storage = createMMKV({
  id: "user-alarms-storage",
});

const ALARMS_KEY = "alarms_list";

export const alarmStorage = {
  // Synchronous read
  getAllAlarms: (): AlarmType[] => {
    const rawData = storage.getString(ALARMS_KEY);

    // getString returns undefined if the key doesn't exist
    if (rawData === undefined) return [];

    try {
      return JSON.parse(rawData);
    } catch (e) {
      console.error("MMKV Parse Error:", e);
      return [];
    }
  },

  // Synchronous write
  saveAlarms: (alarms: AlarmType[]) => {
    storage.set(ALARMS_KEY, JSON.stringify(alarms));
  },

  // FIXED: Using .remove() for a specific key as per V4 docs
  deleteAlarmsKey: () => {
    storage.remove(ALARMS_KEY);
  },

  // FIXED: Using .clearAll() to wipe the whole instance
  wipeEntireStorage: () => {
    storage.clearAll();
  },
};

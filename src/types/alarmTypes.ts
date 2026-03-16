export type RepeatInterval = "none" | "daily" | "weekly" | "2min";

export interface AlarmType {
  id: string;
  time: string;
  label: string;
  isActive: boolean;
  repeat: RepeatInterval;
}

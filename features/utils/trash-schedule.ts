import { WeekDay } from "./days";

type TrashType = "can" | "pet" | "burnable" | "nonburnable" | "other";

type TrashInfo = {
  type: TrashType;
  name: string;
};

type WeekSchedule = Record<WeekDay, TrashInfo | null>;

export const TRASH_SCHEDULE1: WeekSchedule = {
  mon: { type: "can", name: "缶" },
  tue: { type: "burnable", name: "燃えるごみ" },
  wed: { type: "pet", name: "ペットボトル" },
  thu: null,
  fri: { type: "burnable", name: "燃えるごみ" },
  sat: null,
  sun: null,
};

export const TRASH_SCHEDULE2: WeekSchedule = {
  mon: { type: "other", name: "ビン・危険ごみ・古着類・白色トレイ" },
  tue: { type: "burnable", name: "燃えるごみ" },
  wed: { type: "nonburnable", name: "燃えないごみ・古紙類" },
  thu: null,
  fri: { type: "burnable", name: "燃えるごみ" },
  sat: null,
  sun: null,
};

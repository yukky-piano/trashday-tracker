import { useEffect, useMemo, useState } from "react";

export type WeekDay = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export const WEEKS: WeekDay[] = [
  "sun",
  "mon",
  "tue",
  "wed",
  "thu",
  "fri",
  "sat",
];

export const WEEK_NAMES: Record<WeekDay, string> = {
  mon: "月",
  tue: "火",
  wed: "水",
  thu: "木",
  fri: "金",
  sat: "土",
  sun: "日",
};

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

type Biweekly = "even" | "odd";
const JST_OFFSET = 9 * 60 * 60 * 1000;
const BASE_DATE = new Date("2023-10-08");

/**
 * 隔週に対応したゴミのスケジュールを返す
 * @returns [今週, 来週]ゴミのスケジュール
 */
export const useWeeklyTrash = () => {
  const [week, setWeek] = useState<Biweekly>("even");

  useEffect(() => {
    const msPerDay = 1000 * 60 * 60 * 24;
    const msPerWeek = msPerDay * 7;
    const currentDate = new Date(new Date().getTime() + JST_OFFSET);
    const diffInMs =
      currentDate.getTime() - new Date(BASE_DATE.getTime()).getTime();
    const weeks = Math.floor(diffInMs / msPerWeek);
    const currentWeekType = weeks % 2 === 1 ? "even" : "odd";
    setWeek(currentWeekType);
  }, []);

  const result: [WeekSchedule, WeekSchedule] = useMemo(() => {
    return week === "even"
      ? [TRASH_SCHEDULE1, TRASH_SCHEDULE2]
      : [TRASH_SCHEDULE2, TRASH_SCHEDULE1];
  }, [week]);

  return result;
};

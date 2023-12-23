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

type WeekSchedule = Record<WeekDay, string | null>;

export const TRASH_SCHEDULE1: WeekSchedule = {
  mon: "缶",
  tue: "燃えるごみ",
  wed: "ペットボトル",
  thu: null,
  fri: "燃えるごみ",
  sat: null,
  sun: null,
};

export const TRASH_SCHEDULE2: WeekSchedule = {
  mon: "ビン・危険ごみ・古着類・白色トレイ",
  tue: "燃えるごみ",
  wed: "燃えないごみ・古紙類",
  thu: null,
  fri: "燃えるごみ",
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
    const diffInMs = currentDate.getTime() - BASE_DATE.getTime();
    const weeks = Math.floor(diffInMs / msPerWeek);
    const currentWeekType = weeks % 2 === 0 ? "even" : "odd";
    setWeek(currentWeekType);
  }, []);

  const schedules: WeekSchedule[] = useMemo(() => {
    const schedules = [TRASH_SCHEDULE1, TRASH_SCHEDULE2];
    return week === "even" ? schedules : schedules.reverse();
  }, [week]);

  return useMemo(
    () => ({
      schedules: schedules,
      trashInfo: (weekDay: WeekDay, isNextWeek: boolean) => {
        const schedule = isNextWeek ? schedules[1] : schedules[0];
        return schedule[weekDay] !== null
          ? schedule[weekDay]
          : "ゴミの日ではありません";
      },
    }),
    [schedules]
  );
};

"use client";
import React, { useState } from "react";
import { Box, Grid, Tab, Tabs } from "@mui/material";
import { WEEKS, WEEK_NAMES } from "@/features/hooks/weekly-trash";
import ApDay, { DaySize } from "./day";
import ApReload from "../setting/reload";

const gridSize: Record<DaySize, number> = {
  sm: 3,
  md: 6,
  lg: 9,
};

const ApTrash = ({ weekday }: { weekday: number }) => {
  const today = new Date();
  const todayWeekday = today.getDay();
  const diffWeekday = weekday - todayWeekday;
  const isMorning = today.getHours() <= 8;

  const isTodayLarge = diffWeekday === 0 && isMorning;
  const isNextDayLarge = diffWeekday === 0 && !isMorning;
  const todaySize: DaySize = isTodayLarge ? "lg" : isNextDayLarge ? "sm" : "md";
  const nextSize: DaySize = isNextDayLarge ? "lg" : isTodayLarge ? "sm" : "md";

  return (
    <Grid container direction="row" justifyContent="space-around" spacing={4}>
      {diffWeekday === 0 && (
        <Grid item xs={12}>
          <Box textAlign="center">本日</Box>
        </Grid>
      )}
      <Grid item xs={12} md={gridSize[todaySize]}>
        <ApDay weekDay={WEEKS[weekday % 7]} size={todaySize} />
      </Grid>
      <Grid item xs={12} md={gridSize[nextSize]}>
        <ApDay weekDay={WEEKS[(weekday + 1) % 7]} size={nextSize} />
      </Grid>
    </Grid>
  );
};

const ApDays = () => {
  const today = new Date().getDay();
  const [selectedTab, setSelectedTab] = useState(today);

  const handleTabClick = (index: number) => {
    setSelectedTab(index);
  };

  return (
    <>
      <Box textAlign="center" m="auto" maxWidth="710px">
        <Tabs
          value={selectedTab}
          centered
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
        >
          {WEEKS.map((day, index) => (
            <Tab
              key={index}
              label={`${WEEK_NAMES[day]}`}
              onClick={() => handleTabClick(index)}
            />
          ))}
        </Tabs>
      </Box>
      <ApTrash weekday={selectedTab % 7} />
      <ApReload />
    </>
  );
};

export default ApDays;

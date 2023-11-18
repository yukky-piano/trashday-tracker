"use client";
import React, { useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { WEEKS, WEEK_NAMES } from "@/features/utils/days";
import { TRASH_SCHEDULE1 } from "@/features/utils/trash-schedule";

const ApDays = () => {
  const today = new Date().getDay();
  const [selectedTab, setSelectedTab] = useState(today);

  const handleTabClick = (index: number) => {
    setSelectedTab(index);
  };

  return (
    <Box>
      <Tabs value={selectedTab} centered>
        {WEEKS.map((day, index) => (
          <Tab
            key={index}
            label={`${WEEK_NAMES[day]}曜日`}
            onClick={() => handleTabClick(index)}
          />
        ))}
      </Tabs>
      <Box textAlign="center" mt={2}>
        <Typography variant="h4">{WEEKS[selectedTab]}</Typography>
        {TRASH_SCHEDULE1[WEEKS[selectedTab]] ? (
          <Typography variant="h6">
            {TRASH_SCHEDULE1[WEEKS[selectedTab]]?.name}
          </Typography>
        ) : (
          <Typography variant="h6">今日はゴミの日ではありません</Typography>
        )}
      </Box>
    </Box>
  );
};

export default ApDays;

"use client";
import React, { useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";

const ApDays = () => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = new Date().getDay();
  const [selectedTab, setSelectedTab] = useState(today);

  const handleTabClick = (index: number) => {
    setSelectedTab(index);
  };

  return (
    <Box>
      <Tabs value={selectedTab} centered>
        {daysOfWeek.map((day, index) => (
          <Tab key={index} label={day} onClick={() => handleTabClick(index)} />
        ))}
      </Tabs>
      <Box textAlign="center" mt={2}>
        <Typography variant="h4">{daysOfWeek[selectedTab]}</Typography>
        <Typography variant="h6">HOGE</Typography>
      </Box>
    </Box>
  );
};

export default ApDays;

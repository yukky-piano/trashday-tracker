"use client";
import React, { useState } from "react";
import { Box, Grid, Tab, Tabs } from "@mui/material";
import { WEEKS, WEEK_NAMES } from "@/features/hooks/weekly-trash";
import ApDay from "./day";

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
      <Grid container direction="row" justifyContent="space-around" spacing={4}>
        <Grid item xs={12} md={6}>
          <ApDay weekDay={WEEKS[selectedTab % 7]} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ApDay weekDay={WEEKS[(selectedTab + 1) % 7]} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ApDays;

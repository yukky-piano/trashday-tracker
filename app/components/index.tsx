"use client";
import React, { useState } from "react";
import { Tab, Tabs } from "@mui/material";
import { WEEKS, WEEK_NAMES } from "@/features/hooks/weekly-trash";
import ApTrash from "./trash";

const ApTrashDay = () => {
  const today = new Date().getDay();
  const [selectedTab, setSelectedTab] = useState(today);

  const handleTabClick = (index: number) => {
    setSelectedTab(index);
  };

  return (
    <>
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
            label={`${WEEK_NAMES[day]}曜`}
            onClick={() => handleTabClick(index)}
          />
        ))}
      </Tabs>
      <ApTrash weekday={selectedTab % 7} />
    </>
  );
};

export default ApTrashDay;

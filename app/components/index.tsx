"use client";
import React, { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import { WEEKS, WEEK_NAMES } from "@/features/hooks/weekly-trash";
import ApReload from "@/features/components/setting/reload";
import ApTrash from "./trash";

const ApTrashDay = () => {
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
              label={`${WEEK_NAMES[day]}曜`}
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

export default ApTrashDay;

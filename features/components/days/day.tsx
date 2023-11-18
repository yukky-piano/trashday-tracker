import React from "react";
import {
  WEEK_NAMES,
  WeekDay,
  useWeeklyTrash,
} from "@/features/hooks/weekly-trash";
import { Box, Typography } from "@mui/material";

const ApDay = ({ weekDay }: { weekDay: WeekDay }) => {
  const [trashSchedule, _] = useWeeklyTrash();

  const formattedName = trashSchedule[weekDay]?.name?.split("・");

  return (
    <Box textAlign="center">
      <Typography variant="h6" mt="3rem" color="primary">
        {WEEK_NAMES[weekDay]}曜日
      </Typography>
      {trashSchedule[weekDay] ? (
        <Box my="3rem">
          {formattedName?.map((name, index) => (
            <Box key={index} my="1rem">
              <Typography variant="h4" fontWeight="bold">
                {name}
              </Typography>
            </Box>
          ))}
        </Box>
      ) : (
        <Box my="3rem">
          <Typography variant="h5">ゴミの日ではありません</Typography>
        </Box>
      )}
    </Box>
  );
};

export default ApDay;

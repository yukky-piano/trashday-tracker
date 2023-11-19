import React from "react";
import {
  WEEK_NAMES,
  WeekDay,
  useWeeklyTrash,
} from "@/features/hooks/weekly-trash";
import { Box, Paper, Typography } from "@mui/material";

export type DaySize = "sm" | "md" | "lg";

const ApDay = ({
  weekDay,
  showNext,
  size = "md",
}: {
  weekDay: WeekDay;
  showNext: boolean;
  size?: DaySize;
}) => {
  const [thisTrashSchedule, nextTrashSchedule] = useWeeklyTrash();

  const trashSchedule = showNext ? nextTrashSchedule : thisTrashSchedule;
  const formattedName = trashSchedule[weekDay]?.name?.split("・");

  return (
    <Box textAlign="center">
      <Typography
        variant={size === "sm" ? "subtitle2" : "h6"}
        mt="3rem"
        color="primary"
      >
        {WEEK_NAMES[weekDay]}曜日
      </Typography>
      {trashSchedule[weekDay] ? (
        <Paper
          elevation={4}
          sx={{ my: "3rem" }}
          variant={size === "lg" ? undefined : "outlined"}
        >
          {formattedName?.map((name, index) => (
            <Box key={index} my="1rem">
              <Typography
                variant={size === "sm" ? "body2" : size === "lg" ? "h3" : "h4"}
                fontWeight={size === "sm" ? "normal" : "bold"}
              >
                {name}
              </Typography>
            </Box>
          ))}
        </Paper>
      ) : (
        <Paper
          elevation={4}
          sx={{ my: "3rem" }}
          variant={size === "lg" ? undefined : "outlined"}
        >
          <Typography variant="h5" my="1rem">
            ゴミの日ではありません
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default ApDay;

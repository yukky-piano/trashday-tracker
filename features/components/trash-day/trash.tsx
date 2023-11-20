import { WEEKS, WeekDay, useWeeklyTrash } from "@/features/hooks/weekly-trash";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { useMemo } from "react";

export type DaySize = "sm" | "md" | "lg";

const ApDay = ({
  weekDay,
  showNextSchedule,
  isLargeSize,
}: {
  weekDay: WeekDay;
  showNextSchedule: boolean;
  isLargeSize: boolean;
}) => {
  const [thisTrashSchedule, nextTrashSchedule] = useWeeklyTrash();

  const trashSchedule = showNextSchedule
    ? nextTrashSchedule
    : thisTrashSchedule;
  const formattedName = trashSchedule[weekDay]?.name?.split("・");

  return (
    <Box textAlign="center">
      {trashSchedule[weekDay] ? (
        <Paper
          elevation={4}
          sx={{
            my: "3rem",
            height: "100%",
            p: "1rem",
          }}
          variant={isLargeSize ? undefined : "outlined"}
        >
          {formattedName?.map((name, index) => (
            <Box key={index} my="1rem">
              <Typography
                variant={isLargeSize ? "h3" : "body2"}
                fontWeight={isLargeSize ? "bold" : "normal"}
              >
                {name}
              </Typography>
            </Box>
          ))}
        </Paper>
      ) : (
        <Paper
          elevation={4}
          sx={{ my: "3rem", height: "100%", p: "1rem" }}
          variant={isLargeSize ? undefined : "outlined"}
        >
          <Typography variant="h5" my="1rem">
            ゴミの日ではありません
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

const ApTrash = ({ weekday }: { weekday: number }) => {
  const today = new Date();
  const todayWeekday = today.getDay();
  const diffWeekday = weekday - todayWeekday;

  const isNextLarge = useMemo(() => {
    const isMorning = today.getHours() <= 8;
    return diffWeekday === 0 && !isMorning;
  }, [diffWeekday, today]);

  const showNext = diffWeekday < 0;

  return (
    <Grid container direction="row" justifyContent="space-around" spacing={4}>
      {diffWeekday === 0 && (
        <Grid item xs={12}>
          <Box textAlign="center">本日</Box>
        </Grid>
      )}
      <Grid item xs={12} md={isNextLarge ? 3 : 9}>
        <ApDay
          weekDay={WEEKS[weekday % 7]}
          showNextSchedule={showNext}
          isLargeSize={!isNextLarge}
        />
      </Grid>
      <Grid item xs={12} md={isNextLarge ? 9 : 3}>
        <Box textAlign="center">
          <Typography variant="h6">NEXT</Typography>
        </Box>
        <ApDay
          weekDay={WEEKS[(weekday + 1) % 7]}
          showNextSchedule={showNext}
          isLargeSize={isNextLarge}
        />
      </Grid>
    </Grid>
  );
};

export default ApTrash;

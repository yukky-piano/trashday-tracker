import { WEEKS, WeekDay, useWeeklyTrash } from "@/features/hooks/weekly-trash";
import { Box, CSSObject, Grid, Typography } from "@mui/material";
import { cyan, grey } from "@mui/material/colors";
import { useMemo } from "react";

export type DaySize = "sm" | "lg";

const largeSx: CSSObject = {
  position: "relative",
  borderBlock: "3px solid",
  borderColor: grey["700"],
  backgroundColor: "primary.main",
  color: grey["900"],
};
const smallSx: CSSObject = {
  position: "relative",
  borderBlock: "1px solid",
  borderColor: grey["A700"],
};

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
      <Box sx={isLargeSize ? largeSx : smallSx}>
        {trashSchedule[weekDay] ? (
          <>
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
          </>
        ) : (
          <Typography variant="h5" my="1rem">
            ゴミの日ではありません
          </Typography>
        )}
      </Box>
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
      <Grid item xs={12}>
        <Box textAlign="center" p="0.5rem">
          <Typography
            variant="caption"
            py="0.5rem"
            px="1rem"
            bgcolor={
              diffWeekday === 0
                ? grey["A700"]
                : showNext
                ? cyan["800"]
                : undefined
            }
            borderRadius="2rem"
          >
            {diffWeekday === 0 && <>今日</>}
            {showNext && <>来週</>}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={isNextLarge ? 3 : 9}>
        <ApDay
          weekDay={WEEKS[weekday % 7]}
          showNextSchedule={showNext}
          isLargeSize={!isNextLarge}
        />
      </Grid>
      <Grid item xs={12} md={isNextLarge ? 9 : 3}>
        <Box textAlign="center">
          <Typography variant="subtitle1">NEXT</Typography>
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

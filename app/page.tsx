import { Box } from "@mui/material";
import ApTrashDay from "./components";
import ApHeader from "@/features/components/header";
import ApReload from "@/features/components/setting/reload";

export default function Home() {
  return (
    <main>
      <ApHeader />
      <Box textAlign="center" m="auto" maxWidth="710px">
        <ApTrashDay />
      </Box>
      <ApReload />
    </main>
  );
}

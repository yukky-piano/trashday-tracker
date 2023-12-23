"use client";

import { useRouter } from "next/navigation";
import { AppBar, Container, Toolbar, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";

const ApHeader = () => {
  const router = useRouter();

  const handleHomeClick = () => {
    router.push("/");
  };

  const handleSearchClick = () => {
    router.push("/search");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton onClick={handleHomeClick}>
            <HomeIcon />
          </IconButton>
          <IconButton onClick={handleSearchClick}>
            <SearchIcon />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ApHeader;

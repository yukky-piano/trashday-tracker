"use client";

import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";

const ApHeader = () => {
  const handleHomeClick = () => {
    //history.push("/");
    console.log("home押したよ");
  };

  const handleSearchClick = () => {
    //history.push("/search");
    console.log("search押したよ");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            トラッシュトラッカー
          </Typography>
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

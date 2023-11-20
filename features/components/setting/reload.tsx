import { Autorenew } from "@mui/icons-material";
import { Button } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import React from "react";

const ApReload: React.FC = () => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <Button
      variant="text"
      size="large"
      sx={{
        position: "fixed",
        right: "20px",
        bottom: "20px",
        color: blueGrey[200],
        borderRadius: "5rem",
      }}
      onClick={handleReload}
    >
      <Autorenew />
      今日のごみを表示
    </Button>
  );
};

export default ApReload;

import { Box, Button, SvgIcon, Typography } from "@mui/material";

import Logo from "assets/Logo.svg";

export default function GoogleAuth({ onSignIn }) {
  return (
    <Box sx={{ padding: "12px" }}>
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
        <Box
          sx={{
            padding: "10px",
            backgroundColor: "#F5F5F5",
            borderRadius: "50%",
            width: "36px",
            height: "36px",
            marginRight: "12px",
          }}
        >
          <SvgIcon component={Logo} viewBox="0 0 30 30" />
        </Box>
        <Box>
          <Typography
            sx={{ fontSize: "13px", fontWeight: "600", lineHeight: "16px" }}
          >
            Connect Google Account
          </Typography>
          <Typography
            sx={{
              fontSize: "11px",
              fontWeight: "500",
              lineHeight: "13px",
              color: "#848484",
            }}
          >
            Please connect Google Account to use this block
          </Typography>
        </Box>
      </Box>
      <Button
        variant="contained"
        sx={{
          textTransform: "unset",
          fontSize: "10px",
          backgroundColor: "#2483F3",
          height: "24px",
          borderRadius: "4px",
          padding: "10px",
        }}
        onClick={onSignIn}
      >
        Connect
      </Button>
    </Box>
  );
}

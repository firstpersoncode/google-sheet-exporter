import { Box, SvgIcon, Typography } from "@mui/material";

import Data from "assets/Data.svg";

export default function NoConnectionNode() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5F5F5",
        padding: "8px 12px",
        borderRadius: "32px",
      }}
    >
      <Box sx={{ width: "16px", height: "16px", marginRight: "4px" }}>
        <SvgIcon
          component={Data}
          sx={{ color: "#848484" }}
          viewBox="0 -2 35 35"
        />
      </Box>
      <Typography sx={{ fontSize: "11px", color: "#262626" }}>
        Connect Flow Node to Import to Google Sheets
      </Typography>
    </Box>
  );
}

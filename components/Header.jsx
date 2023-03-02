import { DeleteOutline } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";

export default function Header({ icon, title, onDelete }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
      <Box
        sx={{
          padding: "8px",
          backgroundColor: "rgba(142, 209, 177, 0.17)",
          borderRadius: "5px",
          marginRight: "12px",
          width: "32px",
          height: "32px",
        }}
      >
        {icon}
      </Box>
      <Typography sx={{ fontSize: "13px", fontWeight: "600", flex: 1 }}>
        {title}
      </Typography>
      <IconButton
        onClick={onDelete}
        sx={{
          padding: "8px",
          backgroundColor: "#F0F0F0",
          borderRadius: "5px",
          width: "32px",
          height: "32px",
        }}
      >
        <DeleteOutline />
      </IconButton>
    </Box>
  );
}

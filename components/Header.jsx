import DeleteOutline from "@mui/icons-material/DeleteOutline";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

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
        onTouchEnd={onDelete}
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

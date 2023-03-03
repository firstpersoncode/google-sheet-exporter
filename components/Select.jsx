import { useMemo, useState } from "react";
import Check from "@mui/icons-material/Check";
import Close from "@mui/icons-material/Close";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Search from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Popover from "@mui/material/Popover";
import SvgIcon from "@mui/material/SvgIcon";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function Select({
  label,
  value,
  displayValue,
  placeholder,
  options = [],
  onChange,
  onDelete,
  endAdornment,
  sx = {},
  error,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [filter, setFilter] = useState("");
  const filteredOptions = useMemo(() => {
    if (!filter) return options;
    return options.filter((o) =>
      `${o.label} ${o.value}`.toLowerCase().includes(filter)
    );
  }, [filter, options]);

  function toggleOption(e) {
    e.stopPropagation();
    setAnchorEl((v) => (v ? null : e.currentTarget));
  }

  function handleChange(value) {
    return function (e) {
      e.stopPropagation();
      onChange && onChange(value);
      setAnchorEl(null);
      setFilter("");
    };
  }

  function handleDelete(e) {
    e.stopPropagation();
    onDelete && onDelete();
  }

  function handleChangeFilter(e) {
    setFilter(e.target.value);
  }

  return (
    <>
      {label && (
        <Box
          sx={{ marginBottom: "12px", display: "flex", alignItems: "center" }}
        >
          <Typography
            sx={{
              fontSize: "11px",
              lineHeight: "13px",
              fontWeight: "600",
              marginRight: "8px",
            }}
          >
            {label}
          </Typography>
          {error && (
            <Typography
              sx={{
                fontSize: "10px",
                fontWeight: "600",
                color: "red",
              }}
            >
              {error}
            </Typography>
          )}
        </Box>
      )}
      <Button
        size="small"
        variant="outlined"
        fullWidth
        onClick={toggleOption}
        onTouchEnd={toggleOption}
        sx={{
          justifyContent: "space-between",
          textTransform: "unset",
          borderColor: Boolean(error) ? "red" : "#F0F0F0",
          fontSize: "11px",
          color: "#262626",
          textAlign: "left",
          height: "36px",
          ...sx,
        }}
        endIcon={
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            {endAdornment}
            {value && onDelete ? (
              <Close
                onClick={handleDelete}
                onTouchEnd={handleDelete}
                size="small"
                sx={{ color: "#848484" }}
              />
            ) : (
              <ExpandMore
                size="small"
                onClick={toggleOption}
                onTouchEnd={toggleOption}
                sx={{ color: "#262626", width: "20px", height: "20px" }}
              />
            )}
          </Box>
        }
      >
        {value ? (
          displayValue || (
            <Typography sx={{ flex: 1, fontSize: "11px", color: "#262626" }}>
              {value}
            </Typography>
          )
        ) : (
          <Typography sx={{ flex: 1, fontSize: "11px", color: "#262626" }}>
            {placeholder}
          </Typography>
        )}
      </Button>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={toggleOption}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box sx={{ p: "8px" }}>
          <TextField
            size="small"
            fullWidth
            placeholder="Search"
            value={filter}
            onChange={handleChangeFilter}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <List>
          {filteredOptions.map((o) => (
            <ListItem
              key={o.value}
              disablePadding
              secondaryAction={
                value === o.value ? (
                  <IconButton edge="end" aria-label="delete">
                    <Check color="primary" />
                  </IconButton>
                ) : undefined
              }
            >
              <ListItemButton
                disabled={o.disabled}
                onClick={handleChange(o.value)}
                onTouchEnd={handleChange(o.value)}
              >
                {o.icon && (
                  <ListItemIcon>
                    <SvgIcon component={o.icon} />
                  </ListItemIcon>
                )}
                <ListItemText
                  sx={{ "& .MuiTypography-root": { fontSize: "11px" } }}
                  primary={o.label}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Popover>
    </>
  );
}

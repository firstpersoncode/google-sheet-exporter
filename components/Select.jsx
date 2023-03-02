import { useMemo, useState } from "react";
import { Check, Close, ExpandMore, Search } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";

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
        sx={{
          justifyContent: "space-between",
          textTransform: "unset",
          borderColor: Boolean(error) ? "red" : "#F0F0F0",
          fontSize: "11px",
          color: "#262626",
          textAlign: "left",
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
              <IconButton size="small" onClick={handleDelete}>
                <Close />
              </IconButton>
            ) : (
              <IconButton size="small" onClick={toggleOption}>
                <ExpandMore />
              </IconButton>
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

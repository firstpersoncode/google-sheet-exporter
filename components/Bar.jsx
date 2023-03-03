import { useState } from "react";
import Add from "@mui/icons-material/Add";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Popover from "@mui/material/Popover";
import SvgIcon from "@mui/material/SvgIcon";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { useAppContext } from "context";

import Data from "assets/Data.svg";
import Sheet from "assets/Sheet.svg";

export default function Bar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { addNode } = useAppContext();

  function toggleAdd(e) {
    setAnchorEl((v) => (v ? null : e.currentTarget));
  }

  function onAddNode(type) {
    return function () {
      addNode({ type, left: null, right: null });
      setAnchorEl(null);
    };
  }

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
            onClick={toggleAdd}
          >
            <Add />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flex: 1 }}>
            Google Sheet Exporter
          </Typography>
        </Toolbar>
      </AppBar>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={toggleAdd}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={onAddNode("data")}>
              <ListItemIcon>
                <SvgIcon component={Data} sx={{ color: "#848484" }} />
              </ListItemIcon>
              <ListItemText primary="Data" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={onAddNode("exporter")}>
              <ListItemIcon>
                <SvgIcon component={Sheet} />
              </ListItemIcon>
              <ListItemText primary="Exporter" />
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>
    </>
  );
}

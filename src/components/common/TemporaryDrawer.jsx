import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";

export default function TemporaryDrawer({ position, content }) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {content}
    </Box>
  );

  return (
    <div>
      <React.Fragment key={position}>
        <drawerIcon />
        <Button onClick={toggleDrawer(position, true)}>
          <MenuIcon />
        </Button>
        <Drawer
          anchor={position}
          open={state[position]}
          onClose={toggleDrawer(position, false)}
        >
          {list(position)}
        </Drawer>
      </React.Fragment>
    </div>
  );
}

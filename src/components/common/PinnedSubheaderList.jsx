import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import ControlledTreeView from "./ControlledTreeView";

export default function PinnedSubheaderList({ data }) {
  console.log("cat", data);
  return (
    <React.Fragment>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          maxHeight: "74vh",
          "& ul": { padding: 0 },
        }}
        subheader={
          <ListSubheader sx={{ bgcolor: "silver", borderRadius: 2 }}>
            CATEGORY
          </ListSubheader>
        }
      >
        {data
          .filter((i) => i.parentId === "root")
          .map((i) => (
            <li key={`section-${i.displayName}`}>
              <ul>
                <ListSubheader>{`${i.displayName}`}</ListSubheader>
                {[0, 1, 2].map((item) => (
                  <ListItem key={`item-${i.displayName}-${item}`}>
                    <ListItemText primary={`Item ${item}`} />
                  </ListItem>
                ))}
              </ul>
            </li>
          ))}
        {/* {[0, 1, 2, 3, 4].map((sectionId) => (
        <li key={`section-${sectionId}`}>
          <ul>
            <ListSubheader>{`I'm sticky ${sectionId}`}</ListSubheader>
            {[0, 1, 2].map((item) => (
              <ListItem key={`item-${sectionId}-${item}`}>
                <ListItemText primary={`Item ${item}`} />
              </ListItem>
            ))}
          </ul>
        </li>
      ))} */}
      </List>
    </React.Fragment>
  );
}

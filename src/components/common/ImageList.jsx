import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ListCard from "./ListCard";
export default function TitlebarBelowImageList({
  data,
  addToCard,
  removeFromCard,
  cart,
}) {
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }

  return (
    <ImageList
      sx={
        {
          //width: "100%",
          //height: "75vh",
          //overflowY: "scroll",
          //textAlign: "center",
        }
      }
      cols={getWindowDimensions().width > 1024 ? 5 : 1}
      //gap={8}
    >
      {data.map((item) => (
        <ListCard
          item={item}
          addToCard={addToCard}
          removeFromCard={removeFromCard}
          cart={cart}
        />
      ))}
    </ImageList>
  );
}

import * as React from "react";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";

import ButtonGroup from "./ButtonGroup";
const ListCard = ({ item, addToCard, removeFromCard, cart }) => {
  const [selectedSize, setSelectedSize] = React.useState("");
  return (
    <>
      <ImageListItem
        sx={{
          border: 1,
          borderColor: "silver",
          backgroundColor: "#eee",
          borderRadius: 3,
        }}
      >
        <Link to={`/item/${item.itemId}`}>
          <ListSubheader component="div">{item.displayName}</ListSubheader>
        </Link>
        <img
          src={item.picture}
          srcSet={item.picture}
          alt={item.displayName}
          loading="lazy"
        />

        <ImageListItemBar
          title={
            <>
              <span>Price:</span>
              {item.originalPrice > item.currentPrice ? (
                <>
                  <span style={{ textDecoration: "line-through" }}>
                    €{item.originalPrice}
                  </span>
                  <span
                    style={{
                      fontSize: "1rem",
                      fontWeight: 700,
                      color: "red",
                    }}
                  >
                    €{item.currentPrice}
                  </span>
                </>
              ) : (
                <span>€{item.currentPrice}</span>
              )}
            </>
          }
          subtitle={
            <>
              <ButtonGroup
                data={item.availableSizes}
                selected={selectedSize}
                setSelected={setSelectedSize}
              />
              {!cart.filter((i) => i.item.itemId === item.itemId).length ? (
                <h4>
                  <IconButton
                    size="large"
                    aria-label="show 4 new mails"
                    color="inherit"
                    onClick={() => addToCard({ ...item, selectedSize })}
                  >
                    <AddShoppingCartIcon />
                  </IconButton>
                </h4>
              ) : (
                <h4>
                  <IconButton
                    size="large"
                    aria-label="show 4 new mails"
                    color="inherit"
                    onClick={() => removeFromCard(item)}
                  >
                    <RemoveIcon />
                  </IconButton>
                  {cart.filter((i) => i.item.itemId === item.itemId).length}
                  <IconButton
                    size="large"
                    aria-label="show 4 new mails"
                    color="inherit"
                    onClick={() => addToCard(item)}
                  >
                    <AddIcon />
                  </IconButton>
                </h4>
              )}

              {item.tags.map((tag) => (
                <strong key={tag}>{tag}</strong>
              ))}
            </>
          }
          position="below"
        />
      </ImageListItem>
    </>
  );
};

export default ListCard;

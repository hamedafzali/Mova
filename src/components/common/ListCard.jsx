import * as React from "react";
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
const ListCard = ({ item, addToCard, removeFromCard, cart }) => {
  const [selectedSize, setSelectedSize] = React.useState("");

  const handleChange = (event, size) => {
    setSelectedSize(size);
  };
  const control = {
    value: selectedSize,
    onChange: handleChange,
    exclusive: true,
  };
  return (
    <>
      <ImageListItem
        key={item.img}
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
              {/* <div style={{ margin: 10 }}>
              <strong>
                SIZE:
                {item.availableSizes.map((i) => (
                  <span>{` ${i} |`}</span>
                ))}
              </strong>
            </div> */}

              <ToggleButtonGroup size="medium" {...control}>
                {item.availableSizes.map((i) => (
                  <ToggleButton value={i} key={i}>
                    {i}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
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
            </>
          }
          position="below"
        />
      </ImageListItem>
    </>
  );
};

export default ListCard;

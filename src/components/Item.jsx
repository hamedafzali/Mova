import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { getItem } from "../services/product";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import { cartAdded, cartRemoved } from "./../store/cart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ButtonGroup from "./common/ButtonGroup";

export default function Item() {
  const [item, setItem] = React.useState();
  const [selectedSize, setSelectedSize] = React.useState("");
  let { id } = useParams();
  let cart = useSelector((state) => state.cartReducer);
  React.useEffect(() => handleGetItem(id), [id]);
  const handleGetItem = async (key) => {
    const { data } = await getItem(key);
    setItem(data);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  if (!item || !cart.length) return <h1>Loading</h1>;
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xs">
        <Card sx={{ maxWidth: "100%", textAlign: "center" }}>
          <CardMedia
            component="img"
            alt="green iguana"
            image={item && item.picture}
          />

          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item && item.displayName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item && item.description}
            </Typography>

            <br />
            <div>
              <ButtonGroup
                data={item.availableSizes}
                selected={selectedSize}
                setSelected={setSelectedSize}
              />
            </div>

            <span>Price:</span>
            {item && item.originalPrice > item.currentPrice ? (
              <>
                <span style={{ textDecoration: "line-through" }}>
                  €{item && item.originalPrice}
                </span>
                <span
                  style={{
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "red",
                  }}
                >
                  €{item && item.currentPrice}
                </span>
              </>
            ) : (
              <span>€{item && item.currentPrice}</span>
            )}
          </CardContent>
          {cart.length &&
          !cart.filter((i) => i.item.itemId === item.itemId).length ? (
            <h4>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
                onClick={() => dispatch(cartAdded(item))}
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
                onClick={() => dispatch(cartRemoved(item))}
              >
                <RemoveIcon />
              </IconButton>
              {cart.filter((i) => i.item.itemId === item.itemId).length}
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
                onClick={() => dispatch(cartAdded(item))}
              >
                <AddIcon />
              </IconButton>
            </h4>
          )}
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate(`/`)}
            >
              <ArrowBackIcon />
            </Button>
          </CardActions>
        </Card>
      </Container>
    </React.Fragment>
  );
}

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";
import { cartAdded, cartRemoved } from "./../store/cart";
import { CardMedia } from "@mui/material";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
const TAX_RATE = 0.07;
const Cart = () => {
  const navigate = useNavigate();
  let cart = useSelector((state) => state.cartReducer);
  const SUM =
    cart.length && cart.map((i) => i.item.currentPrice).reduce((a, b) => a + b);
  const unique = () => {
    const key = "displayName";

    const arrayUniqueByKey = [
      ...new Map(cart.map((item) => [item[key], item])).values(),
    ];
    return arrayUniqueByKey;
  };
  function ccyFormat(num) {
    return `${num.toFixed(2)}`;
  }
  const dispatch = useDispatch();
  if (!cart.length)
    return (
      <div
        style={{
          width: "100%",
          textAlign: "center",
          color: "silver",
          padding: 5,
        }}
      >
        <br />
        <h1>Your cart is empty</h1>
        <div>
          <RemoveShoppingCartIcon sx={{ fontSize: "10rem", color: "silver" }} />
        </div>
        <br />
        <br />
        <Button
          variant="contained"
          sx={{ backgroundColor: "silver" }}
          onClick={() => navigate(`/`)}
        >
          <ArrowBackIcon value="sds" />
          Back to Shop
        </Button>
      </div>
    );

  return (
    <Table
      sx={{
        border: "1px solid silver",
        maxWidth: 700,
      }}
      aria-label="spanning table"
      align="center"
    >
      <TableHead>
        <TableRow>
          {console.log(unique())}
          <TableCell align="center" colSpan={4}>
            Details
          </TableCell>
          <TableCell align="right">Total Price</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Image</TableCell>
          <TableCell>Desc</TableCell>
          <TableCell align="center">Qty.</TableCell>
          <TableCell align="right">Unit</TableCell>
          <TableCell align="right">Sum</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {cart.length &&
          cart.map((row) => (
            <TableRow key={row.item.displayName}>
              <TableCell>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "transparent" }}
                  onClick={() => navigate(`/item/${row.item.itemId}`)}
                >
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    image={row && row.item.picture}
                    sx={{ width: 120 }}
                  />
                </Button>
              </TableCell>
              <TableCell>
                {row.item.displayName}
                <br /> Size:
                {row.item.selectedSize ? row.item.selectedSize : "Free Size"}
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  whiteSpace: "nowrap",
                }}
              >
                {cart.filter((i) => i.item.itemId === row.item.itemId)
                  .length && (
                  <h4>
                    <IconButton
                      size="large"
                      aria-label="show 4 new mails"
                      color="inherit"
                      onClick={() => dispatch(cartRemoved(row.item))}
                    >
                      <RemoveIcon />
                    </IconButton>
                    {cart.length &&
                      cart.filter((i) => i.item.itemId === row.item.itemId)
                        .length}
                    <IconButton
                      size="large"
                      aria-label="show 4 new mails"
                      color="inherit"
                      onClick={() => dispatch(cartAdded(row.item))}
                    >
                      <AddIcon />
                    </IconButton>
                  </h4>
                )}
              </TableCell>
              <TableCell align="right">{row.item.currentPrice}</TableCell>
              <TableCell align="right">
                {ccyFormat(row.item.currentPrice)}
              </TableCell>
            </TableRow>
          ))}

        <TableRow>
          <TableCell rowSpan={4} />
          <TableCell colSpan={3}>Subtotal</TableCell>
          <TableCell align="right">
            {cart.length &&
              ccyFormat(
                cart.map((i) => i.item.currentPrice).reduce((a, b) => a + b)
              )}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell>Tax</TableCell>
          <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
            0
          )} %`}</TableCell>
          <TableCell align="right" colSpan={3}>
            {ccyFormat(SUM * TAX_RATE)}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell align="right">{ccyFormat(SUM * TAX_RATE + SUM)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="right">
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate(`/`)}
            >
              <ArrowBackIcon />
            </Button>
          </TableCell>
          <TableCell align="right">
            <Button variant="contained" color="success">
              <ShoppingCartCheckoutIcon />
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default Cart;

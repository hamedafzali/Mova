import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { cartAdded, cartEmpty, cartRemoved } from "./../store/cart";
import AppBar from "./common/appBar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

import { getCategories, getCollections, getItems } from "./../services/product";
import TitlebarBelowImageList from "./common/ImageList";

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [items, setItems] = useState([]);
  let { type, q } = useParams();
  useEffect(() => {
    handleGetCategories();
    handleGetCollections();
    handleGetItems();
  }, []);
  useEffect(() => {
    handleGetItems();
  }, [type, q]);
  const handleGetCategories = async () => {
    const { data } = await getCategories();
    setCategories(data);
  };
  const handleGetCollections = async () => {
    const { data } = await getCollections();
    setCollections(data);
  };
  const handleGetItems = async () => {
    const { data } = await getItems("sport", type, q);
    setItems(data);
  };

  const dispatch = useDispatch();
  let cart = useSelector((state) => state.cartReducer);
  const GItem = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  return (
    <Fragment>
      <AppBar data={[categories, collections]} />

      <Box sx={{ flexGrow: 1, marginTop: 5 }}>
        <Grid container spacing={2} padding={2}>
          <Grid item xs={12} md={12}>
            <GItem>
              <TitlebarBelowImageList
                data={items}
                cart={cart}
                addToCard={(item) => dispatch(cartAdded(item))}
                removeFromCard={(item) => dispatch(cartRemoved(item))}
              />
            </GItem>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default Shop;

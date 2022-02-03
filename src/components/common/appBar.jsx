import * as React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import CardHeader from "@mui/material/CardHeader";
// import NotificationsIcon from "@mui/icons-material/Notifications";
import TemporaryDrawer from "./TemporaryDrawer";
import RichObjectTreeView from "./RichObjectTreeView";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));
const GItem = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),

  textAlign: "left",

  color: theme.palette.text.secondary,
  fontSize: "1rem",
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PrimarySearchAppBar({ data }) {
  const [categoryTree, setCategoryTree] = React.useState([]);
  const [category, setCategory] = React.useState([]);
  const [collection, setCollection] = React.useState([]);

  React.useEffect(() => {
    new Promise((resolve, reject) => {
      setCategory(data[0]);
      setCollection(data[1]);
      resolve();
    }).then(setCategoryTree(nest(data[0])));
  }, [data]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  let cart = useSelector((state) => state.cartReducer);

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  const nest = (items, categoryId = "root", link = "parentId") =>
    items
      .filter((item) => item[link] === categoryId)
      .map((item) => ({ ...item, children: nest(items, item.categoryId) }));

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      sx={{ width: 500, maxWidth: "100%" }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    ></Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleToggle}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={cart.length} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Shopping cart</p>
      </MenuItem>
    </Menu>
  );

  const content = (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} padding={2}>
        <Grid item xs={12} md={6}>
          <CardHeader
            action={<IconButton aria-label="settings"></IconButton>}
            title="Categories"
            subheader="You could find anything here by category name"
          />
          {category
            .filter((i) => i.parentId === "root")
            .map((row) => (
              <GItem>
                <List>
                  <Link to={`/category/${row.categoryId}`} className="app-link">
                    <ListItem button key={row.displayName}>
                      <ListItemIcon>
                        <ArrowForwardIosIcon />
                      </ListItemIcon>
                      <ListItemText primary={row.displayName} />
                    </ListItem>
                  </Link>
                </List>
                <RichObjectTreeView
                  data={
                    categoryTree &&
                    categoryTree.filter(
                      (i) => i.categoryId === row.categoryId
                    )[0]
                  }
                  expanded={category.map((i) => i.categoryId)}
                />
              </GItem>
            ))}
        </Grid>
        <Grid item xs={12} md={6}>
          <CardHeader
            action={<IconButton aria-label="settings"></IconButton>}
            title="All Collections"
            subheader="The Newest are here"
          />
          {collection &&
            collection.map((i) => (
              <GItem>
                <List>
                  <Link
                    to={`/collection/${i.collectionId}`}
                    className="app-link"
                  >
                    <ListItem button key={i.displayName}>
                      <ListItemIcon>
                        <ArrowForwardIosIcon />
                      </ListItemIcon>
                      <ListItemText primary={i.displayName} />
                    </ListItem>
                  </Link>
                </List>
              </GItem>
            ))}
        </Grid>
      </Grid>
    </Box>
  );
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="inherit" enableColorOnDark={true}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <TemporaryDrawer position="top" content={content} />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            MOVA Shop
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "flex", md: "flex" } }}>
            <Link to="/cart" className="app-link">
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
                onClick={handleToggle}
              >
                <Badge badgeContent={cart.length} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}

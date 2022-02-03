import { Navigate } from "react-router-dom";
import Shop from "./components/Shop";
import Item from "./components/Item";
import Cart from "./components/Cart";

export const routes = [
  {
    path: "/",
    element: <Shop />,
    exact: "exact",
  },
  {
    path: "/:type/:q",
    element: <Shop />,
  },
  {
    path: "/item/:id",
    element: <Item />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  { path: "*", exact: true, element: <Navigate to="/" /> },
];

//Action Types
export const CART_ADDED = "cartAdded";
export const CART_REMOVED = "cartRemoved";
export const CART_SUMMARY = "cartSummary";
export const CART_EMPTY = "cartEmpty";

//actions
export const cartAdded = (data) => ({
  type: CART_ADDED,
  payload: data,
});
export const cartRemoved = (data) => ({
  type: CART_REMOVED,
  payload: data,
});
export const cartSummary = () => ({
  type: CART_SUMMARY,
});
export const cartEmpty = () => ({
  type: CART_EMPTY,
});
//reducers
export default function cartReducer(state = [], action) {
  switch (action.type) {
    case CART_ADDED:
      return [...state, { item: action.payload }];
    case CART_REMOVED:
      var res = state.filter((s) => s.item.itemId === action.payload.itemId);
      res.pop();

      return [
        ...state.filter((s) => s.item.itemId !== action.payload.itemId),
        ...res,
      ];
    case CART_SUMMARY:
      var result = [];
      state.reduce(function (res, value) {
        if (!res[value.item.itemId]) {
          res[value.item.itemId] = { Id: value.item.itemId, qty: 0 };
          result.push(res[value.Id]);
        }
        res[value.Id].qty += 1;
        return res;
      }, {});

      return result;
    case CART_EMPTY:
      return [];
    default:
      return state;
  }
}

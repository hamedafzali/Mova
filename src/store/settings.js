//Action Types
export const COL_SETTED = "colSetted";

//actions
export const colSetted = (data) => ({
  type: COL_SETTED,
  payload: data,
});

//reducers
export default function settingReducer(state = {}, action) {
  switch (action.type) {
    case COL_SETTED:
      return { ...state, col: action.payload };
    default:
      return state;
  }
}

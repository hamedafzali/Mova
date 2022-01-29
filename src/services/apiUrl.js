import apiList from "../config.json";
const api =
  process.env.REACT_APP_ENV === "development"
    ? apiList.apiUrlDev
    : apiList.apiUrl;
export default api;

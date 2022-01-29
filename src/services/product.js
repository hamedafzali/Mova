import http from "./httpService";
import apiUrl from "./apiUrl";

export function getCategories() {
  return http.get(apiUrl + "/categories");
}
export function getCollections() {
  return http.get(apiUrl + "/collections");
}
export function getTags() {
  return http.get(apiUrl + "/tags");
}
export function getItems(tag, category = "", collection = "") {
  let endPoint = `/items?tags=${tag}`;
  category.length
    ? (endPoint += "category=" + category)
    : (endPoint += "collection=" + collection);

  return http.get(apiUrl + endPoint);
}

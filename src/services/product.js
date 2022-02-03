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
export function getItems(tag, type, q) {
  return http.get(apiUrl + `/items?tags=${tag}&${type}=${q}`);
}
export function getItem(id) {
  return http.get(apiUrl + `/items/${id}`);
}

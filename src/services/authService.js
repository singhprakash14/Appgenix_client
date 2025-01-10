import axios from "axios";
import Cookies from "js-cookie";

const API_URL = "http://localhost:8090/api/v1";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const setAuthToken = () => {
  const token = Cookies.get("token");
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

setAuthToken();

export { api, setAuthToken };

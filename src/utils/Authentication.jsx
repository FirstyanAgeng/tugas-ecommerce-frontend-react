import axios from "axios";
import Cookies from "js-cookie";

// testing cookie
export const setAuthToken = (token) => {
  if (token) {
    Cookies.set("authToken", token, { expires: 7, sameSite: "Lax" });
    axios.defaults.headers.common["Authorization"] = `Token ${token}`;
  }
};

export const setCSRFToken = (csrfToken) => {
  if (csrfToken) {
    // Set the CSRF token as a cookie
    Cookies.set("csrfToken", csrfToken, { expires: 7, sameSite: "Lax" });
  }
};

export const getCSRFToken = (name) => {
  var cookieValue = null;
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();
    if (cookie.startsWith(name + "=")) {
      cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
      break;
    }
  }
  return cookieValue;
};

export const setUserName = (name) => {
  if (name) {
    Cookies.set("userName", name, { expires: 7, sameSite: "Lax" });
  } else {
    Cookies.remove("userName");
  }
};

export const setUserId = (id) => {
  if (id) {
    Cookies.set("userId", id, { expires: 7, sameSite: "Lax" });
  } else {
    Cookies.remove("userId");
  }
};

export const getUserId = () => {
  return Cookies.get("userId");
};

export const getUserName = () => {
  return Cookies.get("userName");
};

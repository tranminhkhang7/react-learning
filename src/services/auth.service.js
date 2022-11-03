import axios from "axios";

const API_URL = "http://localhost:8080";

const signup = (username, password) => {
  return axios
    .post(API_URL + "/signup", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};



const login = (username, password) => {
  const params = new URLSearchParams();
  params.append('username', username);
  params.append('password', password);

  return axios
    .post(API_URL + "/login", params)
    .then((response) => {
      // console.log("hello");
      // console.log(response.data.access_token);
      console.log(response);
      if (response.data.access_token) {
        localStorage.setItem("access_token", JSON.stringify(response.data.access_token));
      }
      if (response.data.user_id) {
        localStorage.setItem("user_id", JSON.stringify(response.data.user_id));
      }
      if (response.data.user_name) {
        localStorage.setItem("user_name", JSON.stringify(response.data.user_name));
      }

      return response.data;
    }) // no catch any error here
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
};

export default authService;

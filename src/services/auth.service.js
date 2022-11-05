import axios from "axios";

const API_URL = "http://localhost:8080";

const signup = async (name, email, password, gender, dob) => {
  // const response = await axios
  //   .post(API_URL + "/account", {
  //     username,
  //     password,
  //   });

  const response = await axios({
    method: 'post',
    url: API_URL + "/account",
    data: {
      "email": email,
      "password": password,
      "name": name,
      "gender": gender,
      "birthday": dob
    }
  });

  // if (response.data.accessToken) {
  //   localStorage.setItem("user", JSON.stringify(response.data));
  // }
  // return response.data;
  if (response.data) return response.data;
};



const login = async (username, password) => {
  const params = new URLSearchParams();
  params.append('username', username);
  params.append('password', password);

  const response = await axios
    .post(API_URL + "/login", params);
  // console.log("hello");
  // console.log(response.data.access_token);
  console.log(response);
  if (response.data.access_token) {
    localStorage.setItem("access_token", response.data.access_token);
  }
  if (response.data.user_id) {
    localStorage.setItem("user_id", JSON.stringify(response.data.user_id));
  }
  if (response.data.user_name) {
    localStorage.setItem("user_name", JSON.stringify(response.data.user_name));
  }
  if (response.data.role) {
    localStorage.setItem("role", JSON.stringify(response.data.role));
  }
  return response.data; // no catch any error here
};

const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("user_id");
  localStorage.removeItem("user_name");
  localStorage.removeItem("role");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("access_token"));
};

const isLoggedIn = () => {
  if (localStorage.getItem("access_token")) return true;
  return false;
}

const checkRole = () => {
  if (localStorage.getItem("role")) return localStorage.getItem("role");
  return null;
}

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
  isLoggedIn,
  checkRole
};

export default authService;

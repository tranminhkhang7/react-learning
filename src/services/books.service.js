import axios from "axios";

const API_URL = "http://localhost:8080";

// const getAllBooks = async() => {
  // const response = await axios.get(API_URL + "/book");
  // console.log(response);
  // return response;
  // return axios.get(API_URL + "/book")
  //   .then(function (response) {
  //     // if (response.data.accessToken) {
  //     //   localStorage.setItem("user", JSON.stringify(response.data));
  //     // }
  //     console.log(response)
  //     return response;
  //   });
// };

const BooksService = {
  getAllBooks : async() => {
    const response = await axios.get(API_URL + "/book");
    // console.log(response);
    return response;
    // return axios.get(API_URL + "/book")
    //   .then(function (response) {
    //     // if (response.data.accessToken) {
    //     //   localStorage.setItem("user", JSON.stringify(response.data));
    //     // }
    //     console.log(response)
    //     return response;
    //   });
  }
};

export default BooksService;
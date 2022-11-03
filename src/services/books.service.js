import axios from "axios";

const API_URL = "http://localhost:8080";

// const getAllBooks = async() => {
//   const response = await axios.get(API_URL + "/book");
//   // console.log(response);
//   return response;
// };

// const getBookDetail = async(id) => {
//   const response = await axios.get(API_URL + "/book/" + id);
//   return response;
// }

async function getAllBooks() {
  try {
    const response = await axios.get(API_URL + "/book");
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function getBookDetail(id) {
  try {
    const response = await axios.get(API_URL + "/book/" + id);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

const BooksService = {
  getAllBooks,
  getBookDetail
};

export default BooksService;
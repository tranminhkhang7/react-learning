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

function getBookDetail(id) {
  try {
    const response = axios.get(API_URL + "/book/" + id);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

// function getBookDetail(id) {
//   try {
//     const response = axios.get(API_URL + "/book/" + id);
//     console.log(response);
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// }

async function getAllBooksAdmin(page, size) {
  try {
    const response = await axios({
      method: 'get',
      url: API_URL + "/book/allbooks?page=" + page + "&size=" + size,
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      }
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function getTotalNumber() {
  try {
    const response = await axios({
      method: 'get',
      url: API_URL + "/book/totalnumber",
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      }
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function addNewBook(title, author, publisher, price, imageLink, description, quantityLeft) {
  try {
    const response = await axios({
      method: 'post',
      url: API_URL + "/book",
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      },
      data: {
        "title": title,
        "author": author,
        "status": "active",
        "publisher": publisher,
        "price": price,
        "imageLink": imageLink,
        "description": description,
        "quantityLeft": quantityLeft,
        "bookGenres": [1, 2, 3]
      }
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function editBook(bookId, title, author, publisher, price, imageLink, description, quantityLeft) {
  try {
    const response = await axios({
      method: 'put',
      url: API_URL + "/book",
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      },
      data: {
        "bookId": bookId,
        "title": title,
        "author": author,
        "status": "active",
        "publisher": publisher,
        "price": price,
        "imageLink": imageLink,
        "description": description,
        "quantityLeft": quantityLeft,
        "bookGenres": [1, 2, 3]
      }
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function deleteBook(bookId) {
  try {
    const response = await axios({
      method: 'delete',
      url: API_URL + "/book/" + bookId,
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      }
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

const BooksService = {
  getAllBooks,
  getBookDetail,
  getAllBooksAdmin,
  getTotalNumber,
  addNewBook,
  editBook,
  deleteBook
};

export default BooksService;
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

async function getAllBooksByGenreId(genreId) {
  try {
    const response = await axios.get(API_URL + "/genre/" + genreId);
    // console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function getAllGenres(page, size) {
  try {
    if (page === undefined) page = 0;
    if (size === undefined) size = 100;
    const response = await axios.get(API_URL + "/genre?page=" + page + "&size=" + size);

    return response;
  } catch (error) {
    console.log(error);
  }
}

async function addNewGenre(name) {
  try {
    const response = await axios({
      method: 'post',
      url: API_URL + "/genre/admin",
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      },
      data: {
        "genreName": name
      }
    });
    // console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function deleteGenre(genreId) {
  try {
    const response = await axios({
      method: 'delete',
      url: API_URL + "/genre/admin/" + genreId,
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      }
    });
    // console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

const GenresService = {
  getAllBooksByGenreId,
  getAllGenres,
  addNewGenre,
  deleteGenre
};

export default GenresService;
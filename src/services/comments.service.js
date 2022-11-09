import axios from "axios";

const API_URL = "http://localhost:8080";

// async function getAllBooks() {
//   try {
//     const response = await axios.get(API_URL + "/book");
//     console.log(response);
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// }

async function addComment(content, rating, bookId) {
  try {
    const response = await axios({
      method: 'post',
      url: API_URL + "/comment",
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      },
      data: {
        "timestamp": (Date.now()).toString(),
        "content": content,
        "rating": rating,
        "customerId": localStorage.getItem('user_id'),
        "bookId": bookId
      }
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function getCommentOfAProduct(id) {
  try {
    const response = await axios.get(API_URL + "/comment/" + id);
    // console.log("k " + id);
    console.log(response);
    // console.log("k");
    return response;
  } catch (error) {
    console.log(error);
  }
}

const CommentsService = {
  addComment,
  getCommentOfAProduct
};

export default CommentsService;
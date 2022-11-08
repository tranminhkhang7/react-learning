// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/compat/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAe96PAOU-UmKw8PJqEGILTbtai5zRVw5M",
  authDomain: "spring-react-learning.firebaseapp.com",
  projectId: "spring-react-learning",
  storageBucket: "spring-react-learning.appspot.com",
  messagingSenderId: "965353646817",
  appId: "1:965353646817:web:c5eef6f2a8dffebd9f25a0",
  measurementId: "G-SS0MLV4ZSH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const storage = getStorage(app);
export default storage

// const firebase = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default firebase

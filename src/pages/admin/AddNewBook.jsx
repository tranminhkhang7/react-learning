import React, { useState, useEffect, useCallback } from "react";
import storage from '../../firebase';
import {
    ref,
    uploadBytes,
    getDownloadURL
} from "firebase/storage";

import { useHistory, Link } from "react-router-dom";
import "../../sass/bookmanagement.css";
import BooksService from "../../services/books.service";
import GenresService from "../../services/genre.service";
import { v4 } from "uuid";
import authService from "../../services/auth.service";
import { Redirect } from "react-router-dom";

const AddNewBook = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publisher, setPublisher] = useState("");
    const [price, setPrice] = useState(0);
    // const [imageLink, setImageLink] = useState("");
    const [description, setDescription] = useState("");
    const [quantityLeft, setQuantityLeft] = useState(0);

    const [imageFile, setImageFile] = useState();

    const history = useHistory();

    // const handleAddBook = async (e) => {

    //     e && e.preventDefault();

    //     let imageLink = "abcd";

    //     const imageRef = ref(storage, `images/${imageFile.name + v4()}`);
    //     uploadBytes(imageRef, imageFile).then((snapshot) => {
    //         getDownloadURL(snapshot.ref).then((url) => {
    //             console.log("image ne", url);
    //             // setImageLink(url);
    //             imageLink = url;
    //             // console.log("image222", imageLink);
    //         });
    //     });

    //     // console.log("reach add book handler", imageLink, "hehe");

    //     try {
    //         await BooksService.addNewBook(title, author, publisher, price,
    //             imageLink, description, quantityLeft).then(
    //                 () => {
    //                     history.push('/bookmanagement');
    //                     // window.location.reload();
    //                 },
    //                 (error) => {
    //                     // setAlert("✖ Wrong email or password");
    //                     console.log(error);
    //                 }
    //             );
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    const handleAddBook = async (e) => {

        e && e.preventDefault();

        let imageLink = "abcd";

        const imageRef = ref(storage, `images/${imageFile.name + v4()}`);
        await uploadBytes(imageRef, imageFile).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                console.log("image ne", url);
                // setImageLink(url);
                imageLink = url;
                // console.log("image222", imageLink);

                try {
                    BooksService.addNewBook(title, author, publisher, price,
                        imageLink, description, quantityLeft).then(
                            () => {
                                history.push('/bookmanagement');
                                // window.location.reload();
                            },
                            (error) => {
                                console.log(error);
                            }
                        );
                } catch (err) {
                    console.log(err);
                }
            });
        });

    };


    const [genres, setGenres] = useState([]);

    const loadGenre = useCallback(() => {
        GenresService.getAllGenres()
            .then(function (response) {
                // console.log(response.data);
                setGenres(response.data);
            })
            .catch(function (error) {
                console.log(error.message);
                return null;
            });
    })

    useEffect(() => {
        loadGenre();
        // return () => {
        //     setImageFile();
        // }
    }, [])


    if (authService.checkRole() !== "\"ADMIN\"") {
        return <Redirect to='/' />;
    }
    return (
        <div className="Book-form-container">
            <form className="Book-form" onSubmit={handleAddBook}>
                <div className="Book-form-content">
                    <h3 className="Book-form-title">Add a new book</h3>

                    <div>
                        <label>Title</label>
                        <input
                            className="Book-form-input"
                            type="text"
                            placeholder="Enter the title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Author</label>
                        <input
                            className="Book-form-input"
                            type="text"
                            placeholder="Enter the author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Publisher</label>
                        <input
                            className="Book-form-input"
                            type="text"
                            placeholder="Enter the publichser"
                            value={publisher}
                            onChange={(e) => setPublisher(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Price</label>
                        <input
                            className="Book-form-input"
                            type="text"
                            placeholder="Enter the price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Image</label>
                        <input
                            className="Book-form-input"
                            type="file"
                            placeholder=""
                            // value={imageFile}
                            onChange={(e) => setImageFile(e.target.files[0])}
                        />
                    </div>

                    <div>
                        <label>Description</label>
                        <textarea
                            className="Book-form-input"
                            type="text"
                            placeholder="Enter the description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Quantity</label>
                        <input
                            className="Book-form-input"
                            type="text"
                            placeholder="Enter the quantity"
                            value={quantityLeft}
                            onChange={(e) => setQuantityLeft(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Genres</label>
                        {
                            genres && genres.map((item, index) => (
                                <div key={`Genre-${index}`}>
                                    <input key={`Genre-${index}`} type="checkbox" id={index} name="genreList" value={item.genreName} />
                                    <label for={index} style={{ fontWeight: "normal" }}> {item.genreName}</label>
                                </div>
                            ))
                        }
                    </div>

                    <div>
                        <button type="submit" className="Book-form-button">
                            Finish
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddNewBook;


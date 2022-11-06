import React, { useState, useEffect, useCallback } from "react";
import { useHistory, Link } from "react-router-dom";
import "../../sass/bookmanagement.css";
import BooksService from "../../services/books.service";
import GenresService from "../../services/genre.service";

const EditBook = props => {
    const id = props.match.params.id;

    const [bookDetail, setBookDetail] = useState({});

    const loadProductDetail = useCallback(() => {
        BooksService.getBookDetail(id)
            .then(function (response) {
                console.log(response.data);
                setBookDetail(response.data);
            })
            .catch(function (error) {
                console.log(error.message);
                return null;
            });
    }, [id])

    const [genres, setGenres] = useState([]);

    const loadGenre = useCallback(() => {
        GenresService.getAllGenres()
            .then(function (response) {
                console.log(response.data);
                setGenres(response.data);
            })
            .catch(function (error) {
                console.log(error.message);
                return null;
            });
    })

    const [title, setTitle] = useState(bookDetail.title);
    const [author, setAuthor] = useState();
    const [publisher, setPublisher] = useState();
    const [price, setPrice] = useState();
    const [imageLink, setImageLink] = useState();
    const [description, setDescription] = useState();
    const [quantityLeft, setQuantityLeft] = useState();

    useEffect(() => {
        
        loadGenre();
        loadProductDetail();
        // setTitle(bookDetail.title);
        // setAuthor(bookDetail.author);
    }, [id])

    // loadProductDetail();

    

    // const navigate = useNavigate();
    const history = useHistory();

    const handleEditBook = async (e) => {
        e && e.preventDefault();
        try {
            await BooksService.editBook(id, title, author, publisher, price,
                imageLink, description, quantityLeft).then(
                    () => {
                        history.push('/bookmanagement');
                        // window.location.reload();
                    },
                    (error) => {
                        // setAlert("✖ Wrong email or password");
                        console.log(error);
                    }
                );
        } catch (err) {
            console.log(err);
        }
    };


    

    return (
        <div className="Book-form-container">
            <form className="Book-form" onSubmit={handleEditBook}>
                <div className="Book-form-content">
                    <h3 className="Book-form-title">Edit the book</h3>

                    <div>
                        <label>Title</label>
                        <input
                            className="Book-form-input"
                            type="text"
                            // placeholder={bookDetail.title}
                            defaultValue={bookDetail.title}
                            // value={bookDetail.title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Author</label>
                        <input
                            className="Book-form-input"
                            type="text"
                            // placeholder={bookDetail.author}
                            defaultValue={bookDetail.author}
                            // value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Publisher</label>
                        <input
                            className="Book-form-input"
                            type="text"
                            // placeholder={bookDetail.publisher}
                            defaultValue={bookDetail.publisher}
                            // value={publisher}
                            onChange={(e) => setPublisher(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Price</label>
                        <input
                            className="Book-form-input"
                            type="text"
                            // placeholder={bookDetail.price}
                            defaultValue={bookDetail.price}
                            // value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Image</label>
                        <input
                            className="Book-form-input"
                            type="text"
                            // placeholder={bookDetail.imageLink}
                            defaultValue={bookDetail.imageLink}
                            // value={imageLink}
                            onChange={(e) => setImageLink(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Description</label>
                        <textarea
                            className="Book-form-input"
                            type="text"
                            // placeholder={bookDetail.description}
                            defaultValue={bookDetail.description}
                            // value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Quantity</label>
                        <input
                            className="Book-form-input"
                            type="text"
                            // placeholder={bookDetail.quantityLeft}
                            defaultValue={bookDetail.quantityLeft}
                            // value={quantityLeft}
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

export default EditBook;


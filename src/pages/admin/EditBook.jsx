import React, { useState, useEffect, useCallback, useRef } from "react";
import { Redirect } from "react-router-dom";
import { useHistory, Link } from "react-router-dom";
import "../../sass/bookmanagement.css";
import authService from "../../services/auth.service";
import BooksService from "../../services/books.service";
import GenresService from "../../services/genre.service";

const EditBook = props => {
    const id = props.match.params.id;

    const [bookDetail, setBookDetail] = useState({});

    const loadProductDetail = () => {
        BooksService.getBookDetail(id)
            .then(function (response) {
                console.log(response.data);
                setBookDetail(response.data);
            })
            .catch(function (error) {
                console.log(error.message);
                return null;
            });
    }

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

    // const [title, setTitle] = useState();
    // const [author, setAuthor] = useState();
    // const [publisher, setPublisher] = useState();
    // const [price, setPrice] = useState();
    // const [imageLink, setImageLink] = useState();
    // const [description, setDescription] = useState();
    // const [quantityLeft, setQuantityLeft] = useState();

    const title = useRef();
    const author = useRef();
    const publisher = useRef();
    const price = useRef();
    const imageLink = useRef();
    const description = useRef();
    const quantityLeft = useRef();

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
        // setTitle("title goc", bookDetail.title);
        // console.log("title goc", bookDetail.title)
        // console.log("title n", title.current);

        if (title.current === undefined) title.current = bookDetail.title;
        if (author.current === undefined) author.current = bookDetail.author;
        if (publisher.current === undefined) publisher.current = bookDetail.publisher;
        if (price.current === undefined) price.current = bookDetail.price;
        if (imageLink.current === undefined) imageLink.current = bookDetail.imageLink;
        if (description.current === undefined) description.current = bookDetail.description;
        if (quantityLeft.current === undefined) quantityLeft.current = bookDetail.quantityLeft;

        try {
            await BooksService.editBook(id, title.current, author.current, 
                publisher.current, price.current,
                imageLink.current, description.current, quantityLeft.current).then(
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

    if (authService.checkRole() !== "\"ADMIN\"") {
        return <Redirect to='/' />;
    }
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
                            // value={title}
                            // onChange={(e) => setTitle(e.target.value)}
                            onChange={(e) => title.current = e.target.value}
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
                            // onChange={(e) => setAuthor(e.target.value)}
                            onChange={(e) => author.current = e.target.value}
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
                            // onChange={(e) => setPublisher(e.target.value)}
                            onChange={(e) => publisher.current = e.target.value}
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
                            // onChange={(e) => setPrice(e.target.value)}
                            onChange={(e) => price.current = e.target.value}
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
                            // onChange={(e) => setImageLink(e.target.value)}
                            onChange={(e) => imageLink.current = e.target.value}
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
                            // onChange={(e) => setDescription(e.target.value)}
                            onChange={(e) => description.current = e.target.value}
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
                            // onChange={(e) => setQuantityLeft(e.target.value)}
                            onChange={(e) => quantityLeft.current = e.target.value}
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


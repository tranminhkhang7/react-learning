import React, { useState, useEffect, useCallback } from "react";
import { useHistory, Link } from "react-router-dom";
import "../../sass/genremanagement.css";
import BooksService from "../../services/books.service";
import GenresService from "../../services/genre.service";

const AddNewGenre = () => {
    const [name, setName] = useState("");

    const history = useHistory();

    const handleAddGenre = async (e) => {
        e && e.preventDefault();
        try {
            await GenresService.addNewGenre(name).then(
                    () => {
                        history.push('/genremanagement');
                        window.location.reload();
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


    // useEffect(() => {
    //     loadGenre()
    // }, [])


    return (
        <div className="Genre-form-container">
            <form className="Genre-form" onSubmit={handleAddGenre}>
                <div className="Genre-form-content">
                    <h3 className="Genre-form-title">Add a new book</h3>

                    <div>
                        <label>Genre name</label>
                        <input
                            className="Genre-form-input"
                            type="text"
                            placeholder="Enter the genre's name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>                    

                    <div>
                        <button type="submit" className="Genre-form-button">
                            Finish
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddNewGenre;


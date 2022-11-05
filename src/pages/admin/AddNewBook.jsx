import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import authService from "../../services/auth.service";
import "../../sass/bookmanagement.css";

const AddNewBook = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState("");

    // const navigate = useNavigate();
    const history = useHistory();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await authService.login(username, password).then(
                () => {
                    history.push('/');
                    window.location.reload();
                },
                (error) => {
                    setAlert("✖ Wrong email or password");
                    console.log(error);
                }
            );
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="Book-form-container">
            <form className="Book-form" onSubmit={handleLogin}>
                <div className="Book-form-content">
                    <h3 className="Book-form-title">Add a new book</h3>

                    <div>
                        <label>Title</label>
                        <input
                            className="Book-form-input"
                            type="text"
                            placeholder="Enter the title"
                        //   value={username}
                        //   onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Author</label>
                        <input
                            className="Book-form-input"
                            type="text"
                            placeholder="Enter the author"
                        //   value={password}
                        //   onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Publisher</label>
                        <input
                            className="Book-form-input"
                            type="text"
                            placeholder="Enter the publichser"
                        //   value={password}
                        //   onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Price</label>
                        <input
                            className="Book-form-input"
                            type="text"
                            placeholder="Enter the price"
                        //   value={password}
                        //   onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Image</label>
                        <input
                            className="Book-form-input"
                            type="text"
                            placeholder=""
                        //   value={password}
                        //   onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Description</label>
                        <textarea
                            className="Book-form-input"
                            type="text"
                            placeholder="Enter the description"
                        //   value={password}
                        //   onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Quantity</label>
                        <input
                            className="Book-form-input"
                            type="text"
                            placeholder="Enter the quantity"
                        //   value={password}
                        //   onChange={(e) => setPassword(e.target.value)}
                        />
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


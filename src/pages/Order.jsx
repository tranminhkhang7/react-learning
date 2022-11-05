import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import authService from "../services/auth.service";
import "../sass/order.css";

const Order = () => {
    const [phone, setUserName] = useState("");
    const [address, setPassword] = useState("");
    //   const [alert, setAlert] = useState("");

    // const navigate = useNavigate();
    const history = useHistory();

    //   const handleLogin = async (e) => {
    //     e.preventDefault();
    //     try {
    //       await authService.login(username, password).then(
    //         () => {
    //           history.push('/');
    //           window.location.reload();
    //         },
    //         (error) => {
    //           setAlert("✖ Wrong email or password");
    //           console.log(error);
    //         }
    //       );
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   };

    return (
        <div className="Order-form-container">
            <form className="Order-form" onSubmit={null}>
                <div className="Order-form-content">
                    <h3 className="Order-form-title">Delivery Information</h3>

                    <div>
                        <label>Phone</label>
                        <input
                            // className="form-control mt-1"
                            className="Order-form-input"
                            type="text"
                            placeholder="Enter your phone"
                        //   value={username}
                        //   onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Address</label>
                        <input
                            className="Order-form-input"
                            type="text"
                            placeholder="Enter your address"
                        //   value={password}
                        //   onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div>
                        <button type="submit" className="Order-form-button">
                            Finish
                        </button>
                    </div>

                </div>
            </form>
        </div>
    );
};

export default Order;


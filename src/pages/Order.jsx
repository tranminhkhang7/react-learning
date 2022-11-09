import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import "../sass/order.css";
import OrderService from "../services/order.service";

const Order = () => {
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    // const navigate = useNavigate();
    const history = useHistory();

    const handleOrder = async (e) => {
        e.preventDefault();
        try {
            console.log(phone, address);
            await OrderService.addNewOrder(phone, address).then(
                () => {
                    localStorage.removeItem("cart_items");
                    history.push('/catalog');
                    // window.location.reload();
                },
                (error) => {
                    // history.push('/catalog');
                    console.log(error);
                }
            );
        } catch (err) {
            console.log(err);
        }
    };

    function confirmPopup() {
        let text = "Do you want to continue?";
        if (window.confirm(text) === true) {
            handleOrder(phone, address);
        } else {
            console.log("Cancel");
        }
    }

    return (
        <div className="Order-form-container">
            <form className="Order-form" onSubmit={handleOrder}>
                <div className="Order-form-content">
                    <h3 className="Order-form-title">Delivery Information</h3>

                    <div>
                        <label>Phone</label>
                        <input
                            // className="form-control mt-1"
                            className="Order-form-input"
                            type="text"
                            placeholder="Enter your phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label>Address</label>
                        <input
                            className="Order-form-input"
                            type="text"
                            placeholder="Enter your address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <button className="Order-form-button">
                            Finish
                        </button>
                    </div>

                </div>
            </form>
        </div>
    );
};

export default Order;


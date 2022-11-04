import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import "../sass/login.css";
import "../sass/signup.css"

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("Male");
    const [dob, setDob] = useState("");

    // const navigate = useNavigate();
    const history = useHistory();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await AuthService.signup(name, email, password, gender, dob).then(
                () => {
                    history.push('/');
                    window.location.reload();
                },
                (error) => {
                    console.log(error);
                }
            );
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="Signup-form-container">
            <form className="Signup-form" onSubmit={handleSignup}>
                <div className="Signup-form-content">
                    <h3 className="Signup-form-title">Sign Up</h3>

                    <div>
                        <label>Name</label>
                        <input
                            className="Signup-form-input"
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label>Email</label>
                        <input
                            // className="form-control mt-1"
                            className="Signup-form-input"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>


                    <div>
                        <label>Password</label>
                        <input
                            className="Signup-form-input"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* <div>
                        <label>Comfirm password</label>
                        <input
                            className="Signup-form-input"
                            type="password"
                            placeholder="Re-enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div> */}

                    <div>
                        <label>Gender</label>

                        <div className="Signup-form-radio">
                            <input
                                id="Male"
                                type="radio"
                                name="gender"
                                value="male"
                                onClick={(e) => setGender(e.target.value)}
                                required
                            ></input>
                            <label for="Male">  Male</label>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <input
                                id="Female"
                                type="radio"
                                name="gender"
                                value="female"
                                onClick={(e) => setGender(e.target.value)}
                                required
                            ></input>
                            <label for="Female">  Female</label>
                        </div>

                    </div>

                    <div>
                        <label>Date of birth</label>
                        <input
                            className="Signup-form-input"
                            type="date"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <button type="submit" className="Signup-form-button">
                            Sign up
                        </button>
                    </div>

                    You already have account? <Link to="/login" style={{ textDecoration: "underline" }}>Log in</Link>
                </div>
            </form>
        </div>
    );
};

export default SignUp;


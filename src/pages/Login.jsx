import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import authService from "../services/auth.service";
import "../sass/login.css";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");

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
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleLogin}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Log In</h3>

          <div>
            <label>Email</label>
            <input
              // className="form-control mt-1"
              className="Auth-form-input"
              type="email"
              placeholder="Enter your email"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div>
            <label>Password</label>
            <input
              className="Auth-form-input"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <button type="submit" className="Auth-form-button">
              Log in
            </button>
          </div>

          <div style={{color: "red", marginBottom: "15px", marginTop: "5px"}}>
            {alert}
          </div>

          You have not got any account yet? <Link to="/signup" style={{textDecoration: "underline"}}>Sign up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;


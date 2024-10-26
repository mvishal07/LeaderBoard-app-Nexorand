import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import {useNavigate,Link} from 'react-router-dom'


const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(UserContext);
  const [resMessage, setMessage] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:7000/api/auth/v1/login",
        { username, password }
      );

      if (response.data.success) {
        login(response.data);
        setMessage(response.data.message);
        navigate("/")
        
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message);
    }
  };

  return (
    <div className="login-card">
      <h1>Login into your account</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="name">USER NAME</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          required
          id="name"
        />
        <label htmlFor="pass">PASSWORD</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter Password"
          required
          id="pass"
        />
        <button type="submit">Login</button>
      </form>
      <hr />
      <p>OR</p>
      <Link to="/register" className="link">
        <button className="register-btn">Register</button>
      </Link>
      {resMessage && <p className="response-message">{resMessage}</p>}
    </div>
  );
};

export default LoginPage;

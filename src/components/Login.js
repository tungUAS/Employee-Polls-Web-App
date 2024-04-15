import React, { useState } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { useNavigate } from "react-router-dom";
import loginBackground from "../images/login_background.png"; // Import the image
import "../styles/Login.css";

const Login = (props) => {
  const [selectedName, setSelectedName] = useState("John");
  const { users } = props;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSelectedName(e.target.value);
  };

  const handleLogin = () => {
    props.dispatch(
      setAuthedUser(
        users.find((user) => user.name === selectedName).id,
        selectedName
      )
    );
    navigate("/questions");
  };

  return (
    <div className="login-container">
      <h1>Log In</h1>
      <img src={loginBackground}/>
      <div>
        <label htmlFor="name">Select your name: </label>
        <select id="name" value={selectedName} onChange={handleChange}>
          {users && users.map((user) => (
            <option key={user.id} value={user.name}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
      <br />
      <br />
      <button onClick={() => handleLogin()} className="login-button">Let's Go</button>
    </div>
  );
};

const mapStateToProps = ({ users }) => {
  return {
    users,
  };
};

export default connect(mapStateToProps)(Login);

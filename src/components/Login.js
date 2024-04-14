import React, { useState } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { useNavigate } from "react-router-dom";

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
    navigate("/home");
  };

  return (
    <div>
      <h1>Login</h1>
      <label htmlFor="name">Select your name:</label>
      <select id="name" value={selectedName} onChange={handleChange}>
        {users && users.map((user) => (
          <option key={user.id} value={user.name}>
            {user.name}
          </option>
        ))}
      </select>
      <br />
      <br />
      <button onClick={() => handleLogin()}>Login</button>
    </div>
  );
};

const mapStateToProps = ({ users }) => {
  return {
    users,
  };
};

export default connect(mapStateToProps)(Login);

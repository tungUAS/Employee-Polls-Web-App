import React, { useState } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../redux/actions/authedUser";
import { useNavigate } from "react-router-dom";
import { UsersType } from "../models/user.type";
import { Dispatch } from "redux";
import "../styles/Login.css";

const LoginPage = ({
  users,
  dispatch,
}: {
  users: UsersType;
  dispatch: Dispatch;
}) => {
  const [selectedName, setSelectedName] = useState("Sarah");
  const navigate = useNavigate();

  const pathToBeRedirected = localStorage.getItem("redirect");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedName(e.target.value);
  };

  const handleLogin = () => {
    if(pathToBeRedirected){
      navigate(pathToBeRedirected);
    };

    const user = users.find((user) => user.name === selectedName);
    if (!user) return;
    dispatch(
      setAuthedUser({
        id: user.id,
        name: user.name,
      })
    );
    navigate(pathToBeRedirected ? pathToBeRedirected : "/questions");
  };

  return (
    <div className="login-container">
      <h1>Log In</h1>
      <img
        src="https://gravatar.com/avatar/17461862a35eb112646cd5f27097ca85?s=400&d=robohash&r=x"
        alt="Login Background"
      />
      <div>
        <label htmlFor="name">Select your name: </label>
        <select id="name" value={selectedName} onChange={handleChange}>
          {users.map((user) => (
            <option key={user.id} value={user.name} data-testid="select-option">
              {user.name}
            </option>
          ))}
        </select>
      </div>
      <br />
      <br />
      <button onClick={handleLogin} className="login-button">
        Let's Go
      </button>
    </div>
  );
};

const mapStateToProps = ({ users }: { users: UsersType }) => ({
  users,
});

export default connect(mapStateToProps)(LoginPage);

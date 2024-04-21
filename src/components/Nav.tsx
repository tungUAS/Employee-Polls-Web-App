import { Link } from "react-router-dom";
import "../styles/Nav.css";
import React from "react";
import { setAuthedUser } from "../redux/actions/authedUser";

const Nav = ({dispatch}:{dispatch:any}) => {
  const removeAuthedUser = () => {
    localStorage.removeItem("redirect");
    dispatch(setAuthedUser({id:null,name:null}));
  };

  return (
    <nav className="nav">
      <ul>
        <li>
          <Link to="/questions">Home</Link>
        </li>
        <li>
          <Link to="/leaderboard">Leaderboard</Link>
        </li>
        <li>
          <Link to="/questions/add">New</Link>
        </li>
        <li className="active" onClick={removeAuthedUser}>
          <Link to="/">Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
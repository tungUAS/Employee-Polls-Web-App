import { Link } from "react-router-dom";
import "../styles/Nav.css";

const Nav = () => {
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
        <li className="active">
          <Link to="/logout">Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
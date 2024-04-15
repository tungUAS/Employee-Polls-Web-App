import { connect } from "react-redux";
import Nav from "./Nav";
import "../styles/Leaderboard.css";

const Leaderboard = (props) => {
  const { scores, users } = props;

  const sortedScores = scores.sort((a, b) => {
    if (a.answered !== b.answered) {
        return b.answered - a.answered;
    } else {
        return b.created - a.created;
    }
});


  return (
    <div>
      <Nav />
      <h1>Leaderboard</h1>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Questions Asked</th>
            <th>Questions Answered</th>
          </tr>
        </thead>
        <tbody>
          {sortedScores.map((score) => (
            <tr key={score.user_id}>
              <td>{users.find((user) => user.id === score.user_id).name}</td>
              <td>{score.answered}</td>
              <td>{score.created}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = ({ scores, users }) => {
  return {
    scores: scores,
    users: users,
  };
};

export default connect(mapStateToProps)(Leaderboard);

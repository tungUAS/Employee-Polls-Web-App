import React from "react";
import { connect } from "react-redux";
import Nav from "./Nav";
import "../styles/Leaderboard.css";

const Leaderboard = ({ scores, users } ) => {
  console.log(scores);

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
              <td>
                <div className="user-info">
                  <img
                    src={
                      users.find((user) => user.id === score.user_id).avatar_url
                    }
                    alt="User Avatar"
                    className="avatar"
                  />
                  <span>
                    {users.find((user) => user.id === score.user_id).name}
                  </span>
                </div>
              </td>
              <td>{score.created}</td>
              <td>{score.answered}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = ({ scores, users }) => ({
  scores,
  users,
});

export default connect(mapStateToProps)(Leaderboard);

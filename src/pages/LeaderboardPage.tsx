import React from "react";
import { connect } from "react-redux";
import Nav from "../components/Nav";
import "../styles/Leaderboard.css";
import { ScoresType } from "../models/score.type";
import { UsersType } from "../models/user.type";
import { sortScores } from "../helpers";

const LeaderboardPage = ({ scores, users }: {scores: ScoresType, users: UsersType} ) => {
  const sortedScores = sortScores(scores);

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
                      users.find((user) => user.id === score.user_id)?.avatar_url
                    }
                    alt="User Avatar"
                    className="avatar"
                  />
                  <span>
                    {users.find((user) => user.id === score.user_id)?.name}
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

const mapStateToProps = ({ scores, users }: {scores: ScoresType, users: UsersType}) => ({
  scores,
  users,
});

export default connect(mapStateToProps)(LeaderboardPage);

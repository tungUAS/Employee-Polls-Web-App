import React from "react";
import { connect } from "react-redux";
import Nav from "../components/Nav";
import "../styles/Leaderboard.css";
import { ScoresType } from "../models/score.type";
import { AuthedUserType, UsersType } from "../models/user.type";
import { sortScores } from "../helpers";
import { NotFound } from "../components/NotFound";
import { useNavigate } from "react-router-dom";
import ButtonGoBackTo from "../components/Button";
import { Dispatch } from "redux";

const LeaderboardPage = ({
  scores,
  users,
  authedUser,
  dispatch,
}: {
  scores: ScoresType;
  users: UsersType;
  authedUser: AuthedUserType;
  dispatch: Dispatch;
}) => {
  const navigate = useNavigate();
  if (!authedUser) return <NotFound />;
  const sortedScores = sortScores(scores);

  const goToHomePage = () => {
    navigate("/questions");
  };

  return (
    <div>
      <Nav dispatch={dispatch}/>
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
                      users.find((user) => user.id === score.user_id)
                        ?.avatar_url
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
      <ButtonGoBackTo text="BACK" handleClick={goToHomePage} dataTestId={null}/>
    </div>
  );
};

const mapStateToProps = ({
  scores,
  users,
  authedUser,
  dispatch,
}: {
  scores: ScoresType;
  users: UsersType;
  authedUser: AuthedUserType;
  dispatch: Dispatch;
}) => ({
  scores,
  users,
  authedUser,
  dispatch,
});

export default connect(mapStateToProps)(LeaderboardPage);

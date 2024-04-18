import React, { useEffect, Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import QuestionPage from "./QuestionPage";
import NewQuestion from "./NewQuestionPage";
import Leaderboard from "./LeaderboardPage";
import { connect, ConnectedProps } from "react-redux";
import { handleInitialData } from "../redux/actions/shared";

type PropsFromRedux = ConnectedProps<typeof connect>;

const App: React.FC<PropsFromRedux> = ({ dispatch }: { dispatch: any }) => {
  useEffect(() => {
    dispatch(handleInitialData());
  }, []);

  return (
    <Fragment>
      <div className="container">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/questions" element={<HomePage />} />
          <Route path="/questions/:id" element={<QuestionPage />} />
          <Route path="/questions/add" element={<NewQuestion />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </Fragment>
  );
};

export default connect()(App);

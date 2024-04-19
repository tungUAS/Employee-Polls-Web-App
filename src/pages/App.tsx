import React,{ useEffect, Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import QuestionPage from "./QuestionPage";
import NewQuestion from "./NewQuestionPage";
import Leaderboard from "./LeaderboardPage";
import { connect,ConnectedProps } from "react-redux";
import ProtectedRoute from "../components/ProtectedRoute";
import { handleInitialData } from "../redux/actions/shared";

type PropsFromRedux = ConnectedProps<typeof connect>;

const App: React.FC<PropsFromRedux> = ({dispatch}:{ dispatch: any}) => {
  useEffect(() => {
     dispatch(handleInitialData());
  }, []);

  return (
    <Fragment>
      <div className="container">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/questions" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/questions/:id" element={<ProtectedRoute><QuestionPage /></ProtectedRoute>} />
          <Route path="/questions/add" element={<ProtectedRoute><NewQuestion /></ProtectedRoute>} />
          <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
        </Routes>
      </div>
    </Fragment>
  );
}

export default connect()(App);

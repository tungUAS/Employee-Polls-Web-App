import { useEffect, Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import QuestionPage from "./QuestionPage";
import NewQuestion from "./NewQuestion";
import Leaderboard from "./Leaderboard";
import { receiveUsers } from "../actions/users";
import { receiveQuestions } from "../actions/questions";
import { receiveScores } from "../actions/scores";
import { receiveAnswers } from "../actions/answers";
import { users } from "../_DATA";
import { questions } from "../_DATA";
import { scores } from "../_DATA";
import { answers } from "../_DATA";
import { connect } from "react-redux";
import ProtectedRoute from "./ProtectedRoute";

function App(props) {
  useEffect(() => {
    // combine dispatches
    props.dispatch(receiveUsers(users));
    props.dispatch(receiveQuestions(questions));
    props.dispatch(receiveScores(scores));
    props.dispatch(receiveAnswers(answers));
  }, []);

  return (
    <Fragment>
      <div className="container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/questions" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/questions/:id" element={<ProtectedRoute><QuestionPage /></ProtectedRoute>} />
          <Route path="/questions/add" element={<ProtectedRoute><NewQuestion /></ProtectedRoute>} />
          <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
        </Routes>
      </div>
    </Fragment>
  );
}

export default connect()(App);

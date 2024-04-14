import { useEffect,Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import QuestionPage from "./QuestionPage";
import NewQuestion from "./NewQuestion";
import Leaderboard from "./Leaderboard";
import { receiveUsers } from "../actions/users";
import { receiveQuestions } from "../actions/questions";
import { receiveScores } from "../actions/scores";
import { users } from "../_DATA";
import { questions } from "../_DATA";
import { scores } from "../_DATA";
import { connect } from "react-redux";


function App(props) {
  useEffect(() => {
    // combine dispatches
    props.dispatch(receiveUsers(users));
    props.dispatch(receiveQuestions(questions));
    props.dispatch(receiveScores(scores));
  }, []);

  return (
    <Fragment>
    <div className="container">
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/questions/:id" element={<QuestionPage/>} />
          <Route path="/questions/add" element={<NewQuestion />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </div>
    </Fragment>
  );
}

export default connect()(App);

import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { handleAddNewQuestion } from "../actions/questions";
import { handleUpdateCreatedScores } from "../actions/scores";
import Nav from "./Nav";
import "../styles/NewQuestion.css";

const NewQuestion = ({dispatch, authedUser}) => {
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const addNewQuestion = () => {
    dispatch(handleAddNewQuestion(authedUser.id, optionOne, optionTwo));
    dispatch(handleUpdateCreatedScores(authedUser.id));
    setOptionOne("");
    setOptionTwo("");
    setSubmitted(true);
  };

  useEffect(() => {
    let timer;
    if (submitted) {
      timer = setTimeout(() => {
        setSubmitted(false);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [submitted]);

  return (
    <div>
      <Nav />
      <div className="new-question-container">
      <h1>Would you rather</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Option One"
          value={optionOne}
          onChange={(e) => setOptionOne(e.target.value)}
        />
        <input
          type="text"
          placeholder="Option Two"
          value={optionTwo}
          onChange={(e) => setOptionTwo(e.target.value)}
        />
        <button
          disabled={
            optionOne === "" || optionTwo === "" || optionOne === optionTwo
          }
          onClick={() => addNewQuestion()}
        >
          Submit
        </button>
        {submitted && <p>You just submitted a new question</p>}
      </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser: authedUser,
  };
};

export default connect(mapStateToProps)(NewQuestion);

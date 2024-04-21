import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { handleAddNewQuestion } from "../redux/actions/questions";
import { handleUpdateCreatedScores } from "../redux/actions/scores";
import Nav from "../components/Nav";
import "../styles/NewQuestion.css";
import React from "react";
import { AuthedUserType } from "../models/user.type";
import { Protected } from "../components/Protected";
import { useNavigate } from "react-router-dom";


const NewQuestionPage = ({dispatch, authedUser}:{dispatch: any, authedUser: AuthedUserType}) => {
  const navigate = useNavigate();

  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const addNewQuestion = () => {
    dispatch(handleAddNewQuestion({
      authedUserId: authedUser.id,
      optionOne: optionOne,
      optionTwo: optionTwo,
    }));
    dispatch(handleUpdateCreatedScores({
      authedUserId: authedUser.id,
    }));
    setOptionOne("");
    setOptionTwo("");
    setSubmitted(true);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (submitted) {
      timer = setTimeout(() => {
        setSubmitted(false);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [submitted]);

  if(!authedUser) return <Protected/>

  const goToHomePage = () => {
    navigate("/questions");
  };

  return (
    <div>
      <Nav dispatch={dispatch}/>
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
      <button onClick={goToHomePage}>Back</button>
    </div>
  );
};

const mapStateToProps = ({ authedUser }: {authedUser: AuthedUserType}) => {
  return {
    authedUser: authedUser,
  };
};

export default connect(mapStateToProps)(NewQuestionPage);

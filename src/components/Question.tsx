import { useNavigate } from "react-router-dom";
import "../styles/Question.css";
import React from "react";
import ButtonGoBackTo from "./Button";

const Question = ({ id, name, timestamp }: {id:number, name: string, timestamp: string}) => {
  const navigate = useNavigate();

  const goToHomePage = (id:number) => {
    navigate(`/questions/${id}`);
  };

  return (
    <div className="question-container">
      <p className="author-text">{name}</p>
      <p className="timestamp-text">{timestamp}</p>
      <ButtonGoBackTo text="SHOW" handleClick={() => goToHomePage(id)} dataTestId={`show-button-${id}`}/>
    </div>
  );
};

export default Question;

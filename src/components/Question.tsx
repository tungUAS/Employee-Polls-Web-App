import { useNavigate } from "react-router-dom";
import "../styles/Question.css";
import React from "react";

const Question = ({ id, name, timestamp }: {id:number, name: string, timestamp: string}) => {
  const navigate = useNavigate();

  const goToQuestion = (id:number) => {
    navigate(`/questions/${id}`);
  };

  return (
    <div className="question-container">
      <p className="author-text">{name}</p>
      <p className="timestamp-text">{timestamp}</p>
      <button onClick={()=> goToQuestion(id)} data-testid={`show-button-${id}`}>SHOW</button>
    </div>
  );
};

export default Question;

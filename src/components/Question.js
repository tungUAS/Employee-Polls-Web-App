import { useNavigate } from "react-router-dom";
import "../styles/Question.css";

const Question = (props) => {
  const { id, name, timestamp } = props;
  console.log("props in question",props);
  const navigate = useNavigate();

  const goToQuestion = (id) => {
    navigate(`/questions/${id}`);
  };

  return (
    <div className="question-container">
      <p className="author-text">{name}</p>
      <p className="timestamp-text">{timestamp}</p>
      <button onClick={()=> goToQuestion(id)}>SHOW</button>
    </div>
  );
};

export default Question;

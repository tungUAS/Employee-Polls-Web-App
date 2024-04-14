import { useNavigate } from "react-router-dom";

const Question = (props) => {
  const { id, name, timestamp } = props;
  const navigate = useNavigate();

  const goToQuestion = (id) => {
    navigate(`/questions/${id}`);
  };

  return (
    <div>
      <p>author: {name}</p>
      <p>created_at: {timestamp}</p>
      <button onClick={()=> goToQuestion(id)}>SHOW</button>
    </div>
  );
};

export default Question;

import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { addAnsweredByQuestion } from "../actions/questions";
import { updateAnsweredScores } from "../actions/scores";

const QuestionPage = (props) => {
  const { questions, users, authedUser } = props;
  const params = useParams();
  const idFromParams = parseInt(params.id);

  const question = questions.find((question) => question.id === idFromParams);
  const author = users.find((user) => user.id === question.created_by).name;
  const isThisAuthorAlreadyAnswered = question.answered_by.includes(
    authedUser.id
  );

  const handleAnswerQuestion = (questionId) => {
    props.dispatch(addAnsweredByQuestion(authedUser.id, questionId));
    props.dispatch(updateAnsweredScores(authedUser.id));
  };

  return (
    <div>
      <h1>Question By: {author}</h1>
      <p>Would you rather </p>
      <div>
        <p>{question.option_one}</p>
        <button
          disabled={isThisAuthorAlreadyAnswered}
          onClick={() => handleAnswerQuestion(question.id)}
        >
          Click
        </button>
      </div>
      <div>
        <p>{question.option_two}</p>
        <button
          disabled={isThisAuthorAlreadyAnswered}
          onClick={() => handleAnswerQuestion(question.id)}
        >
          Click
        </button>
      </div>
      {isThisAuthorAlreadyAnswered ? <p>You Already Answered</p> : null}
    </div>
  );
};

const mapStateToProps = ({ questions, users, authedUser }) => {
  return {
    authedUser,
    questions,
    users,
  };
};

export default connect(mapStateToProps)(QuestionPage);

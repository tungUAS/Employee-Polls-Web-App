import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { addAnsweredByQuestion } from "../actions/questions";
import { updateAnsweredScores } from "../actions/scores";
import { addAnswer } from "../actions/answers"; 

const QuestionPage = (props) => {
  const { questions, users, authedUser, answers } = props;
  const params = useParams();
  const idFromParams = parseInt(params.id);

  const question = questions.find((question) => question.id === idFromParams);
  const author = users.find((user) => user.id === question.created_by).name;
  const isThisAuthorAlreadyAnswered = question.answered_by.includes(authedUser.id);

  const answered = answers.find((answer) => answer.user_id === authedUser.id && answer.question_id === question.id);
  console.log(answered);
  const options = [question.option_one, question.option_two];

  const handleAnswerQuestion = (questionId, option) => {
    props.dispatch(addAnsweredByQuestion(authedUser.id, questionId));
    props.dispatch(updateAnsweredScores(authedUser.id));
    props.dispatch(addAnswer(option, authedUser.id, questionId));
  };

  return (
    <div>
      <h1>Question By: {author}</h1>
      <p>Would you rather </p>
      <div>
        <p>{question.option_one}</p>
        <button
          disabled={isThisAuthorAlreadyAnswered}
          onClick={() => handleAnswerQuestion(question.id, 1)}
        >
          Click
        </button>
      </div>
      <div>
        <p>{question.option_two}</p>
        <button
          disabled={isThisAuthorAlreadyAnswered}
          onClick={() => handleAnswerQuestion(question.id, 2)}
        >
          Click
        </button>
      </div>
      {isThisAuthorAlreadyAnswered ? (
        answered && answered.option === 1 ? <p>You Already Answered with {options[0]}</p> : <p>You Already Answered with {options[1]}</p>
      ) : null}
    </div>
  );
};

const mapStateToProps = ({ questions, users, authedUser, answers }) => {
  return {
    authedUser,
    questions,
    users,
    answers,
  };
};

export default connect(mapStateToProps)(QuestionPage);

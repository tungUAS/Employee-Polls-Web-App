import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { addAnsweredByQuestion } from "../actions/questions";
import { updateAnsweredScores } from "../actions/scores";
import { addAnswer } from "../actions/answers";
import "../styles/QuestionPage.css";

const QuestionPage = (props) => {
  console.log("props",props);
  const { questions, users, authedUser, answers } = props;
  const params = useParams();
  console.log("params",params);
  const idFromParams = parseInt(params.id);
  console.log("idFromParams",idFromParams);
  const question = questions.find((question) => question.id === idFromParams);
  console.log("question",question);

  const author = users.find((user) => user.id === question.created_by).name;
  const isThisAuthorAlreadyAnswered = question.answered_by.includes(
    authedUser.id
  );
  const answered = answers.find(
    (answer) =>
      answer.user_id === authedUser.id && answer.question_id === question.id
  );
  const options = [question.option_one, question.option_two];

  const handleAnswerQuestion = (questionId, option) => {
    props.dispatch(addAnsweredByQuestion(authedUser.id, questionId));
    props.dispatch(updateAnsweredScores(authedUser.id));
    props.dispatch(addAnswer(option, authedUser.id, questionId));
  };

  return (
    <div className="questions-page-container">
      <h1>Question By: {author}</h1>
      <h1>Would you rather </h1>
      <div className="questions-container">
        {[question.option_one, question.option_two].map((option, index) => (
          <div key={index} className="questions-asked-container">
            <p>{option}</p>
            <button
              disabled={isThisAuthorAlreadyAnswered}
              onClick={() => handleAnswerQuestion(question.id, index + 1)}
            >
              Submit
            </button>
          </div>
        ))}
      </div>
      {isThisAuthorAlreadyAnswered && (
          <p>
            You Already Answered with{" "}
            {answered ? options[answered.option - 1] : null}
          </p>
        )}
    </div>
  );
};

const mapStateToProps = ({ questions, users, authedUser, answers }) => ({
  questions,
  users,
  authedUser,
  answers,
});

export default connect(mapStateToProps)(QuestionPage);

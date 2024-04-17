import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { addAnsweredByQuestion } from "../actions/questions";
import { updateAnsweredScores } from "../actions/scores";
import { addNewAnswer } from "../actions/answers";
import "../styles/QuestionPage.css";

const QuestionPage = (props) => {
  const { questions, users, authedUser, answers } = props;
  const params = useParams();
  const idFromParams = parseInt(params.id);
  const question = questions.find((question) => question.id === idFromParams);

  const author = users.find((user) => user.id === question.created_by);
  let isThisAuthorAlreadyAnswered = question.answered_by.includes(
    authedUser.id
  );

  const answered = answers.find(
    (answer) =>
      answer.user_id === authedUser.id && answer.question_id === question.id
  );
  const options = [question.option_one, question.option_two];

  const numberOfPeopleAnsweredThisQuestion = question.answered_by.length;
  const numberOfPeopleVotedForOptionOne = answers.filter(
    (answer) => answer.question_id === question.id && answer.option === 1
  ).length;
  const numberOfPeopleVotedForOptionTwo = answers.filter(
    (answer) => answer.question_id === question.id && answer.option === 2
  ).length;

  const handleAnswerQuestion = (questionId, option) => {
    props.dispatch(addAnsweredByQuestion(authedUser.id, questionId));
    props.dispatch(updateAnsweredScores(authedUser.id));
    props.dispatch(addNewAnswer(option, authedUser.id, questionId));
    isThisAuthorAlreadyAnswered = true;
  };

  return (
    <div className="questions-page-container">
      <h1>Question By: {author.name}</h1>
      <img src={author.avatar_url} alt="avatar" />
      <h1>Would you rather </h1>
      <div className="questions-container">
        {[question.option_one, question.option_two].map((option, index) => (
          <div key={index} className="questions-asked-container">
            <p>{option}</p>
            {!isThisAuthorAlreadyAnswered && (
              <button
                onClick={() => handleAnswerQuestion(question.id, index + 1)}
              >
                Submit
              </button>
            )}
          </div>
        ))}
      </div>
      {isThisAuthorAlreadyAnswered && (
        <p>
          You Already Answered with{" "}
          {answered ? options[answered.option - 1] : null}
        </p>
      )}
      {numberOfPeopleAnsweredThisQuestion > 0 ? (
        <>
          <p>
            {numberOfPeopleAnsweredThisQuestion} people answered this question
          </p>
          <p>{numberOfPeopleVotedForOptionOne} people voted for option one</p>
          <p>{numberOfPeopleVotedForOptionTwo} people voted for option two</p>
        </>
      ) : (
        <p>Be the first to answer this question</p>
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

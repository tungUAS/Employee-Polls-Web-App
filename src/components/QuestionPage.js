import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { handleAddAnsweredByQuestion } from "../actions/questions";
import { handleUpdateAnsweredScores } from "../actions/scores";
import { handleAddNewAnswer } from "../actions/answers";
import "../styles/QuestionPage.css";

const QuestionPage = ({
  questions,
  users,
  authedUser,
  answers,
  dispatch,
}) => {
  const params = useParams();
  const idFromParams = parseInt(params.id);
  const question = questions.find((question) => question.id === idFromParams);

  const [voteForOptionOne, setVoteForOptionOne] = useState(0);
  const [voteForOptionTwo, setVoteForOptionTwo] = useState(0);
  const [numberOfPersonAnsweredThisQuestion, setNumberOfPersonAnsweredThisQuestion] = useState(0);
  const [isThisAuthedUserAlreadyAnswered, setIsThisAuthedUserAlreadyAnswered] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (question) {
      setIsThisAuthedUserAlreadyAnswered(question.answered_by.includes(authedUser.id));
      setNumberOfPersonAnsweredThisQuestion(question.answered_by.length);

      const votes = answers.filter((answer) => answer.question_id === question.id);
      const optionOneVotes = votes.filter((vote) => vote.option === 1).length;
      const optionTwoVotes = votes.filter((vote) => vote.option === 2).length;
      setVoteForOptionOne(optionOneVotes);
      setVoteForOptionTwo(optionTwoVotes);

      setOptions([question.option_one, question.option_two]);
    }
  }, [question, authedUser, answers]);

  const author = question ? users.find((user) => user.id === question.created_by) : null;
  const answered = question ? answers.find(
    (answer) => answer.user_id === authedUser.id && answer.question_id === question.id
  ) : null;

  const answerQuestion = (questionId, option) => {
    dispatch(handleAddAnsweredByQuestion(authedUser.id, questionId));
    dispatch(handleUpdateAnsweredScores(authedUser.id));
    dispatch(handleAddNewAnswer(option, authedUser.id, questionId));
  };

  if (!question) {
    return <h1>404 Not Found. Please sign in!</h1>;
  }

  return (
    <div className="questions-page-container">
      <h1>Question By: {author.name}</h1>
      <img src={author.avatar_url} alt="Author Avatar" />
      <h1>Would you rather </h1>
      <div className="questions-container">
        {[question.option_one, question.option_two].map((option, index) => (
          console.log("option index", option, index),
          <div key={index} className="questions-asked-container">
            <p>{option}</p>
            {!isThisAuthedUserAlreadyAnswered && (
              <button
                className="submit-button"
                onClick={() => answerQuestion(question.id, index + 1)}
              >
                Submit
              </button>
            )}
          </div>
        ))}
      </div>
      {isThisAuthedUserAlreadyAnswered && (
        <p>
          You answered with {answered ? options[answered.option - 1] : null}
        </p>
      )}
      {numberOfPersonAnsweredThisQuestion > 0 && (
        <div>
          <p>{numberOfPersonAnsweredThisQuestion} people voted this question</p>
          <p>
            {voteForOptionOne} voted for {options[0]}
          </p>
          <p>
            {voteForOptionTwo} voted for {options[1]}
          </p>
        </div>
      )}
      {numberOfPersonAnsweredThisQuestion === 0 && <p>No vote till now</p>}
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

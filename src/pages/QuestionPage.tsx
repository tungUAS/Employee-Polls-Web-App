import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { addAnsweredByQuestion } from "../redux/actions/questions";
import { updateAnsweredScores } from "../redux/actions/scores";
import { addNewAnswer } from "../redux/actions/answers";
import "../styles/QuestionPage.css";
import { QuestionsType } from "../models/question.type";
import { AuthedUserType, UsersType } from "../models/user.type";
import { AnswersType } from "../models/answer.type";
import React from "react";
import { NotFound } from "../components/NotFound";
import { useNavigate } from "react-router-dom";
import ButtonGoBackTo from "../components/Button";

const QuestionPage = ({
  questions,
  users,
  authedUser,
  answers,
  dispatch,
}: {
  questions: QuestionsType;
  users: UsersType;
  authedUser: AuthedUserType;
  answers: AnswersType;
  dispatch: any;
}) => {
  const navigate = useNavigate();

  const params = useParams();
  const idFromParams = parseInt(params.id as string, 10);
  const question = questions.find((question) => question.id === idFromParams);

  if (!question || !authedUser) return <NotFound/>;

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

  const handleAnswerQuestion = ({
    questionId,
    option,
  }: {
    questionId: number;
    option: number;
  }) => {
    dispatch(
      addAnsweredByQuestion({ authedUserId: authedUser.id, questionId })
    );
    dispatch(updateAnsweredScores({ authedUserId: authedUser.id }));
    dispatch(addNewAnswer({ option, authedUserId: authedUser.id, questionId }));
    isThisAuthorAlreadyAnswered = true;
  };

  const goToHomePage = () => {
    navigate("/questions");
  };


  return (
    <div className="questions-page-container">
      <h1>Question By: {author?.name}</h1>
      <img src={author?.avatar_url} alt="avatar" />
      <h1>Would you rather </h1>
      <div className="questions-container">
        {[question.option_one, question.option_two].map((option, index) => (
          <div key={index} className="questions-asked-container">
            <p>{option}</p>
            {!isThisAuthorAlreadyAnswered && (
              <button
                onClick={() =>
                  handleAnswerQuestion({
                    questionId: question.id,
                    option: index + 1,
                  })
                }
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
      <ButtonGoBackTo text="BACK" handleClick={goToHomePage} dataTestId={null}/>
    </div>
  );
};

const mapStateToProps = ({
  questions,
  users,
  authedUser,
  answers,
}: {
  questions: QuestionsType;
  users: UsersType;
  authedUser: AuthedUserType;
  answers: AnswersType;
}) => ({
  questions,
  users,
  authedUser,
  answers,
});

export default connect(mapStateToProps)(QuestionPage);

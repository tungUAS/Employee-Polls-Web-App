import {
  _getQuestions,
  _getUsers,
  _getScores,
  _getAnswers,
  _saveAnswer,
  _saveQuestionAnswer,
  _saveQuestion,
  _updateAnsweredScores,
  _updateCreatedScores,
} from "./_DATA";

export async function getInitialData() {
  const [questions, users, scores, answers] = await Promise.all([
    _getQuestions(),
    _getUsers(),
    _getScores(),
    _getAnswers(),
  ]);
  return {
    questions,
    users,
    scores,
    answers,
  };
}

export async function saveNewAnswer({
  option,
  authedUserId,
  questionId,
}: {
  option: number;
  authedUserId: number;
  questionId: number;
}) {
  return _saveAnswer({ option, authedUserId, questionId });
}

export async function saveQuestionAnswer({
  authedUserId,
  questionId,
}: {
  authedUserId: number;
  questionId: number;
}) {
  return _saveQuestionAnswer({ authedUserId, questionId });
}

export async function saveQuestion({
  authedUserId,
  optionOne,
  optionTwo,
}: {
  authedUserId: number;
  optionOne: string;
  optionTwo: string;
}) {
  return _saveQuestion({ authedUserId, optionOne, optionTwo });
}

export async function saveUpdateAnsweredScores({
  authedUserId,
}: {
  authedUserId: number;
}) {
  return _updateAnsweredScores({ authedUserId });
}

export function saveUpdateCreatedScores({
  authedUserId,
}: {
  authedUserId: number;
}) {
  return _updateCreatedScores({ authedUserId });
}

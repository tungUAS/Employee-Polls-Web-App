import {
  _getQuestions,
  _getUsers,
  _getScores,
  _getAnswers,
  _addNewAnswer,
  _addAnsweredByQuestion,
  _addNewQuestion,
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
  return _addNewAnswer({ option, authedUserId, questionId });
}

export async function saveAnsweredByQuestion({
  authedUserId,
  questionId,
}: {
  authedUserId: number;
  questionId: number;
}) {
  return _addAnsweredByQuestion({ authedUserId, questionId });
}

export async function saveNewQuestion({
  authedUserId,
  optionOne,
  optionTwo,
}: {
  authedUserId: number;
  optionOne: string;
  optionTwo: string;
}) {
  return _addNewQuestion({ authedUserId, optionOne, optionTwo });
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

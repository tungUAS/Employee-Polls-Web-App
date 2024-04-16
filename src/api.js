import {
    _getQuestions,
    _getUsers,
    _getScores,
    _getAnswers,
    _addNewAnswer,
    _addAnsweredByQuestion,
    _addNewQuestion,
    _updateAnsweredScores,
    _updateCreatedScores
} from './_DATA';

export async function getInitialData() {
    const [questions, users, scores, answers] = await Promise.all([
        _getQuestions(),
        _getUsers(),
        _getScores(),
        _getAnswers()
    ]);
    return ({
        questions,
        users,
        scores,
        answers
    });
};

export function saveNewAnswer(option, authedUser, questionId) {
    return _addNewAnswer(option, authedUser, questionId);
}

export function saveAnsweredByQuestion(authedUser, questionId) {
    return _addAnsweredByQuestion(authedUser, questionId);
}

export function saveNewQuestion(authedUser, optionOne, optionTwo) {
    return _addNewQuestion(authedUser, optionOne, optionTwo);
}

export function saveUpdateAnsweredScores(authedUser) {
    return _updateAnsweredScores(authedUser);
}

export function saveUpdateCreatedScores(authedUser) {
    return _updateCreatedScores(authedUser);
}
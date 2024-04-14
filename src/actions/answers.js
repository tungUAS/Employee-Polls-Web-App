export const RECEIVE_ANSWERS = "RECEIVE_ANSWERS";
export const ADD_ANSWER = "ADD_ANSWER";

export function receiveAnswers(answers) {
    return {
        type: RECEIVE_ANSWERS,
        answers,
    };
}

export function addAnswer(option, authedUser, questionId) {
    return {
        type: ADD_ANSWER,
        option,
        authedUser,
        questionId,
    };
};


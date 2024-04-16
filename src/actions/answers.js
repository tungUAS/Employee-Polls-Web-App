import {saveNewAnswer} from "../api";

export const RECEIVE_ANSWERS = "RECEIVE_ANSWERS";
export const ADD_ANSWER = "ADD_ANSWER";

export function receiveAnswers(answers) {
    return {
        type: RECEIVE_ANSWERS,
        answers,
    };
}

export function addNewAnswer(option, authedUser, questionId) {
    return {
        type: ADD_ANSWER,
        option,
        authedUser,
        questionId,
    };
};

export const handleAddNewAnswer = (option, authedUser, questionId) => {
    return async (dispatch) => {
        await saveNewAnswer(option, authedUser, questionId);
        dispatch(addNewAnswer(option, authedUser, questionId));
    };
};
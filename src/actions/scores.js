import { saveUpdateAnsweredScores,saveUpdateCreatedScores } from "../api";

export const RECEIVE_SCORES = "RECEIVE_SCORES";
export const UPDATE_ANSWERED_SCORES = "UPDATE_ANSWERED_SCORES";
export const UPDATE_CREATED_SCORES = "UPDATE_CREATED_SCORES";

export const receiveScores = (scores) => {
    return {
        type: RECEIVE_SCORES,
        scores,
    };
};

export const updateAnsweredScores = (authedUserId) => {
    return {
        type: UPDATE_ANSWERED_SCORES,
        authedUserId,
    };
}

export const updateCreatedScores = (authedUserId) => {
    return {
        type: UPDATE_CREATED_SCORES,
        authedUserId,
    };
}

export const handleUpdateAnsweredScores = (authedUserId) => {
    return async (dispatch) => {
        await saveUpdateAnsweredScores(authedUserId);
        dispatch(updateAnsweredScores(authedUserId));
    };
}

export const handleUpdateCreatedScores = (authedUserId) => {
    return async (dispatch) => {
        await saveUpdateCreatedScores(authedUserId);
        dispatch(updateCreatedScores(authedUserId));
    };
}
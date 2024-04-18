import { Dispatch } from "redux";
import { saveUpdateAnsweredScores,saveUpdateCreatedScores } from "../../api";
import { ScoresType } from "../../models/score.type";

export const RECEIVE_SCORES = "RECEIVE_SCORES";
export const UPDATE_ANSWERED_SCORES = "UPDATE_ANSWERED_SCORES";
export const UPDATE_CREATED_SCORES = "UPDATE_CREATED_SCORES";

export const receiveScores = ({scores}: {scores:ScoresType}) => {
    return {
        type: RECEIVE_SCORES,
        scores,
    };
};

export const updateAnsweredScores = ({authedUserId}:{authedUserId: number}) => {
    return {
        type: UPDATE_ANSWERED_SCORES,
        authedUserId,
    };
}

export const updateCreatedScores = ({authedUserId}:{authedUserId: number}) => {
    return {
        type: UPDATE_CREATED_SCORES,
        authedUserId,
    };
}

export const handleUpdateAnsweredScores = ({authedUserId}:{authedUserId: number}) => {
    return async (dispatch: Dispatch) => {
        dispatch(updateAnsweredScores({authedUserId}));
        await saveUpdateAnsweredScores({authedUserId});
    };
}

export const handleUpdateCreatedScores = ({authedUserId}:{authedUserId: number}) => {
    return async (dispatch: Dispatch) => {
        dispatch(updateCreatedScores({authedUserId}));
        await saveUpdateCreatedScores({authedUserId});
    };
}
import moment from "moment";
import { ScoresType } from "../models/score.type";

export const formatDate = (date: string) => {
    return moment(date).format("MM/DD/YYYY");
};

export const sortScores = (scores: ScoresType) => {
    return scores.sort((a, b) => {
        if(a.answered !== b.answered) {
            return b.answered - a.answered;
        }
        return b.created - a.created;
    });
}
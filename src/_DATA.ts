import { AnswersType } from "./models/answer.type";
import { QuestionsType } from "./models/question.type";
import { ScoresType } from "./models/score.type";
import { UsersType } from "./models/user.type";

export const users: UsersType = [
  {
    id: 1,
    name: "Sarah",
    avatar_url: "https://tylermcginnis.com/would-you-rather/sarah.jpg",
  },
  {
    id: 2,
    name: "Tyler",
    avatar_url: "https://tylermcginnis.com/would-you-rather/tyler.jpg",
  },
  {
    id: 3,
    name: "Dan",
    avatar_url: "https://tylermcginnis.com/would-you-rather/dan.jpg",
  },
  {
    id: 4,
    name: "Tom",
    avatar_url:
      "https://gravatar.com/avatar/17461862a35eb112646cd5f27097ca85?s=400&d=robohash&r=x",
  },
];

export const questions: QuestionsType = [
  {
    id: 1,
    created_at: "2024-01-01T00:00:00.000Z",
    created_by: 1,
    option_one: "Be a front-end developer",
    option_two: "Be a back-end developer",
    answered_by: [],
  },
  {
    id: 2,
    created_at: "2024-01-02T00:00:00.000Z",
    created_by: 2,
    option_one: "Buy a new car",
    option_two: "Buy a new house",
    answered_by: [],
  },
  {
    id: 3,
    created_at: "2024-01-03T00:00:00.000Z",
    created_by: 3,
    option_one: "Go to the gym",
    option_two: "Go to the cinema",
    answered_by: [1, 2],
  },
  {
    id: 4,
    created_at: "2024-01-04T00:00:00.000Z",
    created_by: 4,
    option_one: "Read a book",
    option_two: "Read a magazine",
    answered_by: [],
  },
  {
    id: 5,
    created_at: "2024-01-10T00:00:00.000Z",
    created_by: 1,
    option_one: "Go to the beach",
    option_two: "Go to the mountains",
    answered_by: [],
  },
];

export const scores: ScoresType = [
  {
    user_id: 1,
    answered: 1,
    created: 2,
  },
  {
    user_id: 2,
    answered: 1,
    created: 1,
  },
  {
    user_id: 3,
    answered: 0,
    created: 1,
  },
  {
    user_id: 4,
    answered: 0,
    created: 1,
  },
];

export const answers = [
  {
    id: 1,
    user_id: 1,
    question_id: 3,
    option: 1,
  },
  {
    id: 2,
    user_id: 2,
    question_id: 3,
    option: 2,
  },
];

export const _getUsers = (): Promise<UsersType> => {
  return new Promise((res, _rej) => {
    setTimeout(() => res(users), 1000);
  });
};

export const _getQuestions = (): Promise<QuestionsType> => {
  return new Promise((res, _rej) => {
    setTimeout(() => res(questions), 1000);
  });
};

export const _getScores = (): Promise<ScoresType> => {
  return new Promise((res, _rej) => {
    setTimeout(() => res(scores), 1000);
  });
};

export const _getAnswers = (): Promise<AnswersType> => {
  return new Promise((res, _rej) => {
    setTimeout(() => res(answers), 1000);
  });
};

export const _saveAnswer = ({option, authedUserId, questionId}:{
  option: number;
  authedUserId: number;
  questionId: number;
}): Promise<void> => {
  return new Promise((res, _rej) => {
    setTimeout(() => {
      answers.push({
        id: answers.length + 1,
        user_id: authedUserId,
        question_id: questionId,
        option,
      });
      res();
    }, 500);
  });
};

export const _saveQuestionAnswer = ({authedUserId, questionId}:{
  authedUserId: number;
  questionId: number;
}): Promise<void> => {
  return new Promise((res, rej) => {
    if (!authedUserId) {
      rej(new Error("User ID is required."));
    };
    if(!questionId) {
      rej(new Error("Question ID is required."));
    };
    setTimeout(() => {
      const questionToUpdate = questions.find((question) => question.id === questionId);
      if (questionToUpdate) {
        questionToUpdate.answered_by.push(authedUserId);
        res();
      };
    }, 500);
  });
};

export const _saveQuestion = ({
  authedUserId,
  optionOne,
  optionTwo,
}: {
  authedUserId: number;
  optionOne: string;
  optionTwo: string;
}): Promise<void> => {
  return new Promise((res, rej) => {
    try {
      if(!authedUserId) {
        rej(new Error("User ID is required."));
      }

      setTimeout(() => {
        questions.push({
          id: questions.length + 1,
          created_at: new Date().toISOString(),
          created_by: authedUserId,
          option_one: optionOne,
          option_two: optionTwo,
          answered_by: [],
        });
        res();
      }, 500);
    } catch (error) {
      rej(error);
    }
  });
};


export const _updateAnsweredScores = ({ authedUserId }: { authedUserId: number }): Promise<void> => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const scoreToUpdate = scores.find((score) => score.user_id === authedUserId);
      if (scoreToUpdate) {
        scoreToUpdate.answered++;
        res();
      }
      rej(new Error("Score not found for the provided user ID."));
    }, 500);
  });
};

export const _updateCreatedScores = ({ authedUserId }: { authedUserId: number }): Promise<void> => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const scoreToUpdate = scores.find((score) => score.user_id === authedUserId);
      if (scoreToUpdate) {
        scoreToUpdate.created++;
        res();
      }
      rej(new Error("Score not found for the provided user ID."));
    }, 500);
  });
};


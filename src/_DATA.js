export const users = [
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

export const questions = [
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

export const scores = [
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

export const _getUsers = () => {
  return new Promise((res, rej) => {
    setTimeout(() => res(users), 1000);
  });
};

export const _getQuestions = () => {
  return new Promise((res, rej) => {
    setTimeout(() => res(questions), 1000);
  });
};

export const _getScores = () => {
  return new Promise((res, rej) => {
    setTimeout(() => res(scores), 1000);
  });
};

export const _getAnswers = () => {
  return new Promise((res, rej) => {
    setTimeout(() => res(answers), 1000);
  });
};

export const _addNewAnswer = (option, authedUser, questionId) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      answers.push({
        id: answers.length + 1,
        user_id: authedUser,
        question_id: questionId,
        option,
      });
      res();
    }, 500);
  });
};

export const _addAnsweredByQuestion = (authedUser, questionId) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      questions
        .find((question) => question.id === questionId)
        .answered_by.push(authedUser);
      res();
    }, 500);
  });
};

export const _addNewQuestion = (authedUser, optionOne, optionTwo) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      questions.push({
        id: questions.length + 1,
        created_at: new Date().toISOString(),
        created_by: authedUser,
        option_one: optionOne,
        option_two: optionTwo,
        answered_by: [],
      });
      res();
    }, 500);
  });
};

export const _updateAnsweredScores = (authedUser) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      scores.find((score) => score.user_id === authedUser).answered++;
      res();
    }, 500);
  });
};

export const _updateCreatedScores = (authedUser) => {
  console.log("score", scores);
  return new Promise((res, rej) => {
    setTimeout(() => {
      scores.find((score) => score.user_id === authedUser).created++;
      res();
    }, 500);
  });
};

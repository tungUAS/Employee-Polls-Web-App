export const users = [
    {
      id: 1,
      name: "John",
    },
    {
      id: 2,
      name: "Emily",
    },
    {
      id: 3,
      name: "Jane",
    },
    {
      id: 4,
      name: "Tom",
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
      created_at: "2024-01-01T00:00:00.000Z",
      created_by: 2,
      option_one: "Buy a new car",
      option_two: "Buy a new house",
      answered_by: [],
    },
    {
      id: 3,
      created_at: "2024-01-01T00:00:00.000Z",
      created_by: 3,
      option_one: "Go to the gym",
      option_two: "Go to the cinema",
      answered_by: [1,2],
    },
    {
      id: 4,
      created_at: "2024-01-01T00:00:00.000Z",
      created_by: 4,
      option_one: "Read a book",
      option_two: "Read a magazine",
      answered_by: [],
    },
    {
      id: 5,
      created_at: "2024-01-01T00:00:00.000Z",
      created_by: 1,
      option_one: "Go to the beach",
      option_two: "Go to the mountains",
      answered_by: [],
    }
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
]
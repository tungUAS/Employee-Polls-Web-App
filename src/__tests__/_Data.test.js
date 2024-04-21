import { _saveQuestion, questions, _saveQuestionAnswer } from "../_DATA";

describe("_saveQuestion function", () => {
  const mockAuthedUser = 1;
  const mockOptionOne = "Option One";
  const mockOptionTwo = "Option Two";

  afterEach(() => {
    questions.pop();
    });

  it("adds a new question correctly", async () => {
    await _saveQuestion({
      authedUserId: mockAuthedUser,
      optionOne: mockOptionOne,
      optionTwo: mockOptionTwo,
    });

    expect(questions).toHaveLength(6);

    const newQuestion = questions[5];
    expect(newQuestion.created_by).toBe(mockAuthedUser);
    expect(newQuestion.option_one).toBe(mockOptionOne);
    expect(newQuestion.option_two).toBe(mockOptionTwo);
    expect(newQuestion.answered_by).toEqual([]);
  });

  it("throws an error when wrong data type is being added", async () => {
    await expect(
      _saveQuestion({
        authedUserId: null,
        optionOne: mockOptionOne,
        optionTwo: mockOptionTwo,
      })
    ).rejects.toThrow("User ID is required.");
    expect(questions).toHaveLength(5);
  });
});

describe("_saveQuestionAnswer function", () => {
  const mockAuthedUser = 1;
  const mockQuestionId = 5;

  it("pushes a new user Id to answered_by array in question object", async () => {
    await _saveQuestionAnswer({
      authedUserId: mockAuthedUser,
      questionId: mockQuestionId,
    });
    const question = questions.find((question) => question.id === mockQuestionId);
    expect(question.answered_by).toStrictEqual([mockAuthedUser]);
  });

  it("throws an error when wrong data type is being added", async () => {
    await expect(
      _saveQuestionAnswer({
        authedUserId: null,
        questionId: mockQuestionId,
      })
    ).rejects.toThrow("User ID is required.");
  });
});
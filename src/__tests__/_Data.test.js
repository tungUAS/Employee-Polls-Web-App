import { _addNewQuestion, questions } from "../_DATA";

describe("_addNewQuestion function", () => {
  const mockAuthedUser = 1;
  const mockOptionOne = "Option One";
  const mockOptionTwo = "Option Two";

  afterEach(() => {
    questions.pop();
    });

  it("adds a new question correctly", async () => {
    await _addNewQuestion({
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
      _addNewQuestion({
        authedUserId: null,
        optionOne: mockOptionOne,
        optionTwo: mockOptionTwo,
      })
    ).rejects.toThrow("User ID is required.");
    expect(questions).toHaveLength(5);
  });
});
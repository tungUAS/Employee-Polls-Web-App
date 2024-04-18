export type QuestionType = {
    id: number,
    created_at: string,
    created_by: number,
    option_one: string,
    option_two: string,
    answered_by: number[],
  };
  
 export type QuestionsType = QuestionType[];
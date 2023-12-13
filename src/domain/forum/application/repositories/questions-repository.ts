import { Question } from "../../enterprise/entities/question";

export interface QuestionsRepository {
  create(question: Question): Promise<void>;
  delete(question: Question): Promise<void>;
  findById(id: string): Promise<Question | null>;
  findQuestionBySlug(slug: string): Promise<Question | null>;
}

import { Question } from "../../enterprise/entities/question";

export interface QuestionsRepository {
  create(question: Question): Promise<void>;
  findQuestionBySlug(slug: string): Promise<Question | null>;
}

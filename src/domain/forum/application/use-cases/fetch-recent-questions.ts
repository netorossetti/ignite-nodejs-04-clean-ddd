import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../repositories/questions-repository";

interface FecthRecentQuestionsUseCaseRequest {
  page: number;
}

interface FecthRecentQuestionsUseCaseResponse {
  questions: Question[];
}

export class FecthRecentQuestionsUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    page,
  }: FecthRecentQuestionsUseCaseRequest): Promise<FecthRecentQuestionsUseCaseResponse> {
    const questions = await this.questionsRepository.findManyRecents({ page });
    return { questions };
  }
}

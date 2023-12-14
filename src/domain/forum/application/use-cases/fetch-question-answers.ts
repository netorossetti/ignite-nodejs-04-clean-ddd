import { Answer } from "../../enterprise/entities/answer";
import { AnswersRepository } from "../repositories/answers-repository";

interface FecthQuestionAnswersUseCaseRequest {
  questionId: string;
  page: number;
}

interface FecthQuestionAnswersUseCaseResponse {
  answers: Answer[];
}

export class FecthQuestionAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    questionId,
    page,
  }: FecthQuestionAnswersUseCaseRequest): Promise<FecthQuestionAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(
      questionId,
      { page }
    );
    return { answers };
  }
}

import { AnswerComment } from "../../enterprise/entities/answer-comment";
import { AnswerCommentsRepository } from "../repositories/answer-comments-repository";

interface FecthAnswerCommentsUseCaseRequest {
  answerId: string;
  page: number;
}

interface FecthAnswerCommentsUseCaseResponse {
  answerComments: AnswerComment[];
}

export class FecthAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    answerId,
    page,
  }: FecthAnswerCommentsUseCaseRequest): Promise<FecthAnswerCommentsUseCaseResponse> {
    const answerComments =
      await this.answerCommentsRepository.findManyByAnswerId(answerId, {
        page,
      });
    return { answerComments };
  }
}

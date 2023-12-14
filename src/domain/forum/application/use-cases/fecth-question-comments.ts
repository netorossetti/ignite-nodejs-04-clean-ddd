import { QuestionComment } from "../../enterprise/entities/question-comment";
import { QuestionCommentsRepository } from "../repositories/question-comments-repository";

interface FecthQuestionCommentsUseCaseRequest {
  questionId: string;
  page: number;
}

interface FecthQuestionCommentsUseCaseResponse {
  questionComments: QuestionComment[];
}

export class FecthQuestionCommentsUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    questionId,
    page,
  }: FecthQuestionCommentsUseCaseRequest): Promise<FecthQuestionCommentsUseCaseResponse> {
    const questionComments =
      await this.questionCommentsRepository.findManyByQuestionId(questionId, {
        page,
      });
    return { questionComments };
  }
}

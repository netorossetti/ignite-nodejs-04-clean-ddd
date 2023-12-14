import { success, failure, Result } from "@/core/result";
import { AnswerCommentsRepository } from "../repositories/answer-comments-repository";

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string;
  answerCommentId: string;
}

type DeleteAnswerCommentUseCaseResponse = Result<string, {}>;

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment = await this.answerCommentsRepository.findById(
      answerCommentId
    );
    if (!answerComment) {
      return failure("Answer Comment not found.");
    }

    if (answerComment.authorId.toString() !== authorId) {
      //throw new Error("Not allowed.");
      return failure("Not allowed");
    }

    await this.answerCommentsRepository.delete(answerComment);

    return success({});
  }
}

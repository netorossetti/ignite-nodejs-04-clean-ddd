import { AnswerCommentsRepository } from "@/domain/forum/application/repositories/answer-comments-repository";

import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment";

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  public items: AnswerComment[] = [];

  async create(answercomment: AnswerComment) {
    this.items.push(answercomment);
  }

  async delete(answerComment: AnswerComment): Promise<void> {
    const itemIndex = this.items.findIndex(
      (item) => item.id === answerComment.id
    );
    if (itemIndex !== -1) {
      this.items.splice(itemIndex, 1);
    }
  }

  async findById(id: string): Promise<AnswerComment | null> {
    const answerComment = this.items.find((item) => item.id.toString() === id);
    if (!answerComment) {
      return null;
    }
    return answerComment;
  }
}

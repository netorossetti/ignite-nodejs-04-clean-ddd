import { QuestionCommentsRepository } from "@/domain/forum/application/repositories/question-comments-repository";

import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  public items: QuestionComment[] = [];

  async create(questioncomment: QuestionComment) {
    this.items.push(questioncomment);
  }

  async delete(questionComment: QuestionComment): Promise<void> {
    const itemIndex = this.items.findIndex(
      (item) => item.id === questionComment.id
    );
    if (itemIndex !== -1) {
      this.items.splice(itemIndex, 1);
    }
  }

  async findById(id: string): Promise<QuestionComment | null> {
    const questionComment = this.items.find(
      (item) => item.id.toString() === id
    );
    if (!questionComment) {
      return null;
    }
    return questionComment;
  }
}

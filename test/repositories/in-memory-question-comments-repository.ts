import { QuestionCommentsRepository } from "@/domain/forum/application/repositories/question-comments-repository";

import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  public items: QuestionComment[] = [];

  async create(questioncomment: QuestionComment) {
    this.items.push(questioncomment);
  }
}

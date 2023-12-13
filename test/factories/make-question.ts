import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import {
  Question,
  QuestionProps,
} from "@/domain/forum/enterprise/entities/question";

export function makeQuestion(override: Partial<QuestionProps> = {}) {
  const newQuestion = Question.create({
    authorId: new UniqueEntityId(),
    title: "Titulo da pergunta",
    content: "Conteudo da pergunta",
    ...override,
  });

  return newQuestion;
}

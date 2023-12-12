import { CreateQuestionUseCase } from "./create-question";
import { QuestionsRepository } from "../repositories/quetions-repository";
import { Question } from "../../enterprise/entities/question";

const fakeQuestionsRepository: QuestionsRepository = {
  create: async (question: Question) => {
    return;
  },
};

test("create a question", async () => {
  const createQuestion = new CreateQuestionUseCase(fakeQuestionsRepository);

  const { question } = await createQuestion.execute({
    authorId: "1",
    title: "Titulo da pergunta",
    content: "Conteudo da pergunta",
  });

  expect(question.id).toBeTruthy();
  expect(question.title).toEqual("Titulo da pergunta");
  expect(question.content).toEqual("Conteudo da pergunta");
});

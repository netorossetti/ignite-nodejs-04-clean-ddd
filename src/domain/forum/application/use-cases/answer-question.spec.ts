import { AnswerQuestionUseCase } from "./answer-question";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase;

describe("Create Answer", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository);
  });

  it("should be able create an answer", async () => {
    const { answer } = await sut.execute({
      instructorId: "1",
      questionId: "1",
      content: "Nova resposta",
    });

    expect(answer.id).toBeTruthy();
    expect(inMemoryAnswersRepository.items[0].id).toEqual(answer.id);
    expect(answer.content).toEqual("Nova resposta");
  });
});

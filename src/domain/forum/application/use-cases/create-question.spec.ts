import { CreateQuestionUseCase } from "./create-question";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: CreateQuestionUseCase;

describe("Create Question", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to create a question", async () => {
    const result = await sut.execute({
      authorId: "1",
      title: "Titulo da pergunta",
      content: "Conteudo da pergunta",
    });

    expect(result.isSuccess()).toBe(true);
    if (!result.isSuccess()) return;

    expect(inMemoryQuestionsRepository.items[0]).toEqual(result.value.question);
  });
});

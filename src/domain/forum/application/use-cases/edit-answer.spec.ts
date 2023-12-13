import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { makeAnswer } from "test/factories/make-answer";
import { EditAnswerUseCase } from "./edit-answer";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: EditAnswerUseCase;

describe("Edit Answer", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new EditAnswerUseCase(inMemoryAnswersRepository);
  });

  it("should be able to edit a answer", async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityId("author-1"),
    });
    await inMemoryAnswersRepository.create(newAnswer);

    await sut.execute({
      authorId: "author-1",
      answerId: newAnswer.id.toString(),
      content: "Novo Conteudo",
    });

    expect(inMemoryAnswersRepository.items).toHaveLength(1);
    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: "Novo Conteudo",
    });
  });

  it("not should be able to edit a answer from another author", async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityId("author-1"),
    });
    await inMemoryAnswersRepository.create(newAnswer);

    expect(async () => {
      await sut.execute({
        authorId: "author-2",
        answerId: newAnswer.id.toString(),
        content: "Novo Conteudo",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});

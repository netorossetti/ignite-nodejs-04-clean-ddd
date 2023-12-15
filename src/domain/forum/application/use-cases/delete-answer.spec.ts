import { makeAnswer } from "test/factories/make-answer";
import { DeleteAnswerUseCase } from "./delete-answer";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { NotAllowedError } from "./errors/not-allowed-error";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: DeleteAnswerUseCase;

describe("Delete Answer", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository);
  });

  it("should be able to delete a answer", async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityId("author-1"),
    });
    await inMemoryAnswersRepository.create(newAnswer);

    expect(inMemoryAnswersRepository.items).toHaveLength(1);

    await sut.execute({
      authorId: "author-1",
      answerId: newAnswer.id.toString(),
    });

    expect(inMemoryAnswersRepository.items).toHaveLength(0);
  });

  it("not should be able to delete a answer from another author", async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityId("author-1"),
    });
    await inMemoryAnswersRepository.create(newAnswer);

    const result = await sut.execute({
      authorId: "author-2",
      answerId: newAnswer.id.toString(),
    });

    expect(result.isFailure()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});

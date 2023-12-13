import { makeAnswer } from "test/factories/make-answer";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { ChooseQuestionBestAnswerUseCase } from "./choose-question-best-answer";
import { makeQuestion } from "test/factories/make-question";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: ChooseQuestionBestAnswerUseCase;

describe("Choose Question Best Answer", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryQuestionsRepository,
      inMemoryAnswersRepository
    );
  });

  it("should be able to choose the question best answer", async () => {
    const newQuestion = makeQuestion();
    await inMemoryQuestionsRepository.create(newQuestion);

    const newAnswer = makeAnswer({ questionId: newQuestion.id });
    await inMemoryAnswersRepository.create(newAnswer);

    await sut.execute({
      authorId: newQuestion.authorId.toString(),
      answerId: newAnswer.id.toString(),
    });

    expect(inMemoryQuestionsRepository.items).toHaveLength(1);
    expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toEqual(
      newAnswer.id
    );
  });

  it("not should be able to choose another author question best answer", async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityId("author-1"),
    });
    await inMemoryQuestionsRepository.create(newQuestion);

    const newAnswer = makeAnswer({ questionId: newQuestion.id });
    await inMemoryAnswersRepository.create(newAnswer);

    expect(async () => {
      await sut.execute({
        authorId: "author-2",
        answerId: newAnswer.id.toString(),
      });
    }).rejects.toBeInstanceOf(Error);
  });
});

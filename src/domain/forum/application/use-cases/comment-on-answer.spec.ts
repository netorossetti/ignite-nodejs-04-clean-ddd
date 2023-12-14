import { InMemoryAnswerCommentsRepository } from "test/repositories/in-memory-answer-comments-repository";
import { CommentOnAnswerUseCase } from "./comment-on-answer";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { makeAnswer } from "test/factories/make-answer";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: CommentOnAnswerUseCase;

describe("Create Answer Comment", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
    sut = new CommentOnAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerCommentsRepository
    );
  });

  it("should be able to create a comment on answer", async () => {
    const answer = makeAnswer();
    await inMemoryAnswersRepository.create(answer);

    const { answerComment } = await sut.execute({
      authorId: "author-1",
      answerId: answer.id.toString(),
      content: "Comentário da pergunta",
    });

    expect(answerComment.id).toBeTruthy();
    expect(inMemoryAnswerCommentsRepository.items[0].id).toEqual(
      answerComment.id
    );
    expect(answerComment.answerId).toEqual(answer.id);
    expect(answerComment.content).toEqual("Comentário da pergunta");
  });
});

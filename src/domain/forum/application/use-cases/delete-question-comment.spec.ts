import { InMemoryQuestionCommentsRepository } from "test/repositories/in-memory-question-comments-repository";
import { makeQuestionComment } from "test/factories/make-question-comment";
import { DeleteQuestionCommentUseCase } from "./delete-question-comment";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: DeleteQuestionCommentUseCase;

describe("Delete Question Comment", () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository();
    sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentsRepository);
  });

  it("should be able to delete a question comment", async () => {
    const newQuestionComment = makeQuestionComment({
      authorId: new UniqueEntityId("author-1"),
    });
    await inMemoryQuestionCommentsRepository.create(newQuestionComment);

    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(1);

    await sut.execute({
      authorId: "author-1",
      questionCommentId: newQuestionComment.id.toString(),
    });

    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(0);
  });

  it("not should be able to delete another author question comment", async () => {
    const newQuestionComment = makeQuestionComment({
      authorId: new UniqueEntityId("author-1"),
    });
    await inMemoryQuestionCommentsRepository.create(newQuestionComment);

    expect(async () => {
      await sut.execute({
        authorId: "author-2",
        questionCommentId: newQuestionComment.id.toString(),
      });
    }).rejects.toBeInstanceOf(Error);
  });
});

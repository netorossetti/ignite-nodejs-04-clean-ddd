import { InMemoryQuestionCommentsRepository } from "test/repositories/in-memory-question-comments-repository";
import { CommentOnQuestionUseCase } from "./comment-on-question";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { makeQuestion } from "test/factories/make-question";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: CommentOnQuestionUseCase;

describe("Create Question Comment", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository();
    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionCommentsRepository
    );
  });

  it("should be able to create a comment on question", async () => {
    const question = makeQuestion();
    await inMemoryQuestionsRepository.create(question);

    const { questionComment } = await sut.execute({
      authorId: "author-1",
      questionId: question.id.toString(),
      content: "Comentário da pergunta",
    });

    expect(questionComment.id).toBeTruthy();
    expect(inMemoryQuestionCommentsRepository.items[0].id).toEqual(
      questionComment.id
    );
    expect(questionComment.questionId).toEqual(question.id);
    expect(questionComment.content).toEqual("Comentário da pergunta");
  });
});

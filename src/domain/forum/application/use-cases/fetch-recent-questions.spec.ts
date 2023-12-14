import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { FecthRecentQuestionsUseCase } from "./fetch-recent-questions";
import { makeQuestion } from "test/factories/make-question";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: FecthRecentQuestionsUseCase;

describe("Fecth Recent Questions", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new FecthRecentQuestionsUseCase(inMemoryQuestionsRepository);

    // habilitar uso de datas fakes no new Date()
    vi.useFakeTimers();
  });

  afterEach(() => {
    // habilitar uso de datas reais no new Date()
    vi.useRealTimers();
  });

  it("Should be able to fecht recent questions", async () => {
    vi.setSystemTime(new Date(2022, 0, 20));
    await inMemoryQuestionsRepository.create(makeQuestion());

    vi.setSystemTime(new Date(2022, 0, 18));
    await inMemoryQuestionsRepository.create(makeQuestion());

    vi.setSystemTime(new Date(2022, 0, 23));
    await inMemoryQuestionsRepository.create(makeQuestion());

    const { questions } = await sut.execute({ page: 1 });

    expect(questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2022, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 18) }),
    ]);
  });

  it("Should be able to fecht paginated recent questions", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionsRepository.create(makeQuestion());
    }

    const { questions } = await sut.execute({ page: 2 });

    expect(questions).toHaveLength(2);
  });
});

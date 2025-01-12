import { Test, TestingModule } from "@nestjs/testing";
import { ListsService } from "./lists.service";
import { of } from "rxjs";
import { ListGatewayInMemory } from "./gateways/list-gateway-in-memory";

const mockList = {
  list: {
    create: jest
      .fn()
      .mockReturnValue(Promise.resolve({ id: 5, name: "my list" })), //aqui estou declarando oq o metodo vai retornar e dizendo que é uma promessa
    findMany: jest.fn(),
    findUnique: jest.fn(),
    // Adicione outros métodos conforme necessário
  },
};

const mockHttpService = {
  post: jest.fn().mockReturnValue(of({ data: {} })),
};

describe("ListsService", () => {
  let service: ListsService;
  let listGateway: ListGatewayInMemory;
  // antes de cada teste eu quero gerar...

  beforeEach(async () => {
    listGateway = new ListGatewayInMemory();
    service = new ListsService(listGateway, mockHttpService as any);
  });

  it("deve criar uma lista", async () => {
    const list = await service.create({ name: "test new list" });
    expect(listGateway.items).toEqual([list]);
  });

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [ListsService],
  //   }).compile();

  //   service = module.get<ListsService>(ListsService);
  // });

  // it('should be defined', () => {
  //   expect(service).toBeDefined();
  // });
});

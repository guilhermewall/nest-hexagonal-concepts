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
  let listPersistenceGateway: ListGatewayInMemory;
  let listIntegrationGateway: ListGatewayInMemory;
  // antes de cada teste eu quero gerar...

  beforeEach(async () => {
    listPersistenceGateway = new ListGatewayInMemory();
    listIntegrationGateway = new ListGatewayInMemory();
    service = new ListsService(listPersistenceGateway, listIntegrationGateway);
  });

  it("deve criar uma lista", async () => {
    const list = await service.create({ name: "test new list" });
    expect(listPersistenceGateway.items).toEqual([
      expect.objectContaining({
        id: list.id,
        name: list.name,
      }),
    ]);
    expect(listIntegrationGateway.items).toEqual([
      expect.objectContaining({
        id: list.id,
        name: list.name,
      }),
    ]);
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

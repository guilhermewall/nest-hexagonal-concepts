import { Inject, Injectable } from "@nestjs/common";
import { CreateListDto } from "./dto/create-list.dto";
import { UpdateListDto } from "./dto/update-list.dto";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";
import { ListGatewayInterface } from "./gateways/list-gateway-interface";
import { DataList } from "./entities/list.entity";

@Injectable()
export class ListsService {
  constructor(
    @Inject("ListPersistenceGateway")
    private listPersistenceGateway: ListGatewayInterface, //uma porta, chamado tambem de Ports ou Adapters
    @Inject("ListIntegrationGateway")
    private listIntegrationGateway: ListGatewayInterface
  ) {}

  async create(createListDto: CreateListDto) {
    const list = new DataList(createListDto.name); // aqui aparentemente estaria so tratando os dados da requisição
    console.log("list", list);

    const newList = await this.listPersistenceGateway.create(list);
    console.log("newList", newList);

    try {
      await this.listIntegrationGateway.create(list);
    } catch (e) {}

    return newList;
  }

  async findAll() {
    return await this.listPersistenceGateway.findAll();
  }

  async findOne(id: number) {
    return await this.listPersistenceGateway.findById(id);
  }

  update(id: number, updateListDto: UpdateListDto) {
    return `This action updates a #${id} list`;
  }

  remove(id: number) {
    return `This action removes a #${id} list`;
  }
}

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
    @Inject("ListGatewayInterface")
    private listGateway: ListGatewayInterface, //uma porta, chamado tambem de Ports ou Adapters
    private httpService: HttpService
  ) {}

  async create(createListDto: CreateListDto) {
    const list = new DataList(createListDto.name); // aqui aparentemente estaria so tratando os dados da requisição
    console.log("list", list);

    const newList = await this.listGateway.create(list);
    console.log("newList", newList);

    await lastValueFrom(
      this.httpService.post("lists", { id: newList.id, name: newList.name })
    );

    return newList;
  }

  async findAll() {
    return await this.listGateway.findAll();
  }

  async findOne(id: number) {
    return await this.listGateway.findById(id);
  }

  update(id: number, updateListDto: UpdateListDto) {
    return `This action updates a #${id} list`;
  }

  remove(id: number) {
    return `This action removes a #${id} list`;
  }
}

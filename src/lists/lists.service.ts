import { Injectable } from "@nestjs/common";
import { CreateListDto } from "./dto/create-list.dto";
import { UpdateListDto } from "./dto/update-list.dto";
import { PrismaService } from "../prisma/prisma.service";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";
import { ListGatewayInterface } from "./gateways/list-gateway-interface";

@Injectable()
export class ListsService {
  constructor(
    private listGateway: ListGatewayInterface,
    private httpService: HttpService
  ) {}

  async create(createListDto: CreateListDto) {
    const newList = await this.prisma.list.create({ data: createListDto });

    await lastValueFrom(this.httpService.post("lists", { name: newList.name }));

    return newList;
  }

  async findAll() {
    return await this.prisma.list.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.list.findUnique({ where: { id } });
  }

  update(id: number, updateListDto: UpdateListDto) {
    return `This action updates a #${id} list`;
  }

  remove(id: number) {
    return `This action removes a #${id} list`;
  }
}

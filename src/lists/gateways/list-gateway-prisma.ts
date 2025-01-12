import { List } from "@prisma/client";
import { DataList } from "../entities/list.entity";
import { ListGatewayInterface } from "./list-gateway-interface";
import { PrismaService } from "src/prisma/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ListGatewayPrisma implements ListGatewayInterface {
  //Tambem chamado de Repository ou Adapter, utilizado para fazer a comunicação com o banco de dados
  constructor(private prisma: PrismaService) {}

  async create(dataList: DataList): Promise<List> {
    const list = await this.prisma.list.create({ data: dataList });
    list.id = list.id;

    return list;
  }

  async findAll(): Promise<List[]> {
    const lists = await this.prisma.list.findMany();

    return lists;
  }

  async findById(id: number): Promise<List> {
    const list = await this.prisma.list.findUnique({ where: { id } });

    if (!list) {
      throw new Error("List not found");
    }

    return list;
  }
}

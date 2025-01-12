import { create } from "domain";
import { DataList } from "../entities/list.entity";
import { ListGatewayInterface } from "./list-gateway-interface";

interface List {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export class ListGatewayInMemory implements ListGatewayInterface {
  items: List[] = [];

  async create(dataList: DataList): Promise<List> {
    const formatData = {
      id: this.items.length + 1,
      name: dataList.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.items.push(formatData);

    return formatData;
  }

  async findAll(): Promise<List[]> {
    return this.items;
  }

  async findById(id: number): Promise<List> {
    const list = this.items.find((list) => list.id === id);

    if (!list) {
      throw new Error("List not found");
    }

    return list;
  }
}

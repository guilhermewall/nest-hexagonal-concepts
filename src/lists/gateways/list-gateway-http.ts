import { Inject, Injectable } from "@nestjs/common";
import { ListGatewayInterface } from "./list-gateway-interface";
import { HttpService } from "@nestjs/axios";
import { DataList } from "../entities/list.entity";
import { lastValueFrom } from "rxjs";
import { v4 as uuidv4 } from "uuid";
import { List } from "@prisma/client";

@Injectable()
export class ListGatewayHttp implements ListGatewayInterface {
  constructor(
    @Inject(HttpService)
    private httpService: HttpService
  ) {}

  private generateRandomId(): number {
    return Math.floor(Math.random() * 1000);
  }

  async create(list: DataList): Promise<List> {
    const newList = await lastValueFrom(
      this.httpService.post("lists", {
        id: this.generateRandomId(),
        name: list.name,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    );

    return newList.data;
  }

  async findAll(): Promise<List[]> {
    const lists = await lastValueFrom(this.httpService.get("lists"));

    return lists.data;
  }

  async findById(id): Promise<List> {
    const list = await lastValueFrom(this.httpService.get(`lists/${id}`));
    return list.data;
  }
}

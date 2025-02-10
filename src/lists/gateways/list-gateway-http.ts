import { Inject, Injectable } from "@nestjs/common";
import { ListGatewayInterface } from "./list-gateway-interface";
import { HttpService } from "@nestjs/axios";
import { DataList } from "../entities/list.entity";
import { lastValueFrom } from "rxjs";
import { v4 as uuidv4 } from "uuid";
import { List } from "@prisma/client";
import { create } from "domain";

@Injectable()
export class ListGatewayHttp implements ListGatewayInterface {
  constructor(
    @Inject(HttpService)
    private httpService: HttpService
  ) {}

  async create(data: DataList): Promise<List> {
    const response = await lastValueFrom(
      this.httpService.post("lists", {
        name: data.name,
      })
    );

    return response.data;
  }

  async findAll(): Promise<List[]> {
    const response = await lastValueFrom(this.httpService.get("lists"));

    return response.data;
  }

  async findById(id: number): Promise<List> {
    const response = await lastValueFrom(this.httpService.get(`lists/${id}`));

    return response.data;
  }
}

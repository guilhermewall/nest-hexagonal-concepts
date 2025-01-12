import { List } from "@prisma/client";
import { DataList } from "../entities/list.entity";

export interface ListGatewayInterface {
  create(list: DataList): Promise<List>;
  findAll(): Promise<List[]>;
  findById(id: number): Promise<List>;
}

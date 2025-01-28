import { Module } from "@nestjs/common";
import { ListsService } from "./lists.service";
import { ListsController } from "./lists.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { HttpModule } from "@nestjs/axios";
import { ListGatewayPrisma } from "./gateways/list-gateway-prisma";
import { ListGatewayHttp } from "./gateways/list-gateway-http";

@Module({
  imports: [
    PrismaModule,
    HttpModule.register({
      baseURL: "http://localhost:8000",
    }),
  ],
  controllers: [ListsController],
  providers: [
    ListsService,
    ListGatewayPrisma,
    ListGatewayHttp,
    {
      provide: "ListPersistenceGateway",
      useClass: ListGatewayPrisma,
    },
    {
      provide: "ListIntegrationGateway",
      useClass: ListGatewayHttp,
    },
  ],
})
export class ListsModule {}

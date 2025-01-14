import { Module } from "@nestjs/common";
import { ListsService } from "./lists.service";
import { ListsController } from "./lists.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { HttpModule } from "@nestjs/axios";
import { ListGatewayPrisma } from "./gateways/list-gateway-prisma";

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
    {
      provide: "ListGatewayInterface",
      useClass: ListGatewayPrisma,
    },
  ],
})
export class ListsModule {}

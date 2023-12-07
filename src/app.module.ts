import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { CommonModule } from "./common/common.module";
import { ProductosModule } from "./products/products.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { envConfigSchema } from "./config/config.validation";
import { envConfig } from "./config/env.config";
import { CategoriesModule } from "./categories/categories.module";
import { SalesModule } from "./sales/sales.module";
import { ShoppingCartModule } from "./shopping-cart/shopping-cart.module";
import { UsersModule } from "./users/users.module";
import { BillsModule } from "./bills/bills.module";
import { SeedModule } from "./seed/seed.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".env", ".env.dev", ".env.test", ".env.prod"],
      load: [envConfig],
      validationSchema: envConfigSchema,
      isGlobal: true,
      validationOptions: {
        abortEarly: true,
      },
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>("db.host")!,
        port: configService.get<number>("db.port")!,
        database: configService.get<string>("db.name")!,
        username: configService.get<string>("db.user")!,
        password: configService.get<string>("db.pass")!,
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    ProductosModule,
    CommonModule,
    CategoriesModule,
    SalesModule,
    ShoppingCartModule,
    UsersModule,
    BillsModule,
    SeedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

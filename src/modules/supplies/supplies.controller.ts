import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";
import { SuppliesService } from "./supplies.service";
import { CreateSupplyDto } from "./dto/create-supply.dto";

@Controller("supplies")
export class SuppliesController {
  constructor(private readonly suppliesService: SuppliesService) {}

  @Post()
  create(@Body() createSupplyDto: CreateSupplyDto) {
    return this.suppliesService.create(createSupplyDto);
  }

  @Get()
  findAll() {
    return this.suppliesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.suppliesService.findOne(id);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.suppliesService.remove(id);
  }
}

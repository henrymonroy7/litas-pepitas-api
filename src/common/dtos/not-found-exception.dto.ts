import { NotFoundException } from "@nestjs/common";
import { ErrorInstanceDto } from "./error-instance.dto";

export class NotFoundExceptionDto extends NotFoundException {
  constructor(errorInstance: ErrorInstanceDto) {
    super(errorInstance);
  }
}

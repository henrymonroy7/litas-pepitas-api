import { ApiResponseDto } from "./api-response.dto";
import { ErrorInstanceDto } from "./error-instance.dto";

export class ErrorResponseDto extends ApiResponseDto {
  error: ErrorInstanceDto;

  constructor(
    { traceId, message: generalMessage, statusCode }: ApiResponseDto,
    errorInstance: ErrorInstanceDto,
  ) {
    super(traceId, generalMessage, statusCode);
    this.error = errorInstance;
  }
}

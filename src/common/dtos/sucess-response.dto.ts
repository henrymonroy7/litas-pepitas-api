import { ApiResponseDto } from './api-response.dto';

export class SuccessResponseDto<T> extends ApiResponseDto {
  data: T;

  constructor({ traceId, message, statusCode }: ApiResponseDto, data: T) {
    super(traceId, message, statusCode);
    this.data = data;
  }
}

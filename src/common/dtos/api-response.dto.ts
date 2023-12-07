export class ApiResponseDto {
  traceId: string;
  message: string;
  statusCode: number;

  constructor(traceId: string, message: string, statusCode: number) {
    this.traceId = traceId;
    this.message = message;
    this.statusCode = statusCode;
  }
}

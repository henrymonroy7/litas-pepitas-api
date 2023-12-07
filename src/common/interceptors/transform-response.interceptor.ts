import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { SuccessResponseDto } from "../dtos/sucess-response.dto";
import { ErrorResponseDto } from "../dtos/error-response.dto";
import { randomUUID } from "crypto";
import { ApiResponseDto } from "../dtos/api-response.dto";
import { ErrorInstanceDto } from "../dtos/error-instance.dto";

export type TransformResponse<T> = SuccessResponseDto<T> | ErrorResponseDto;

const QUERY_ERRORS = ["QueryFailedError"];

@Injectable()
export class TransformResponseInterceptor<T>
  implements NestInterceptor<T, TransformResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<TransformResponse<T>> {
    const traceId = randomUUID();

    const genericResponse: ApiResponseDto = {
      traceId,
      message: "Success",
      statusCode: context.switchToHttp().getResponse().statusCode,
    };

    return next.handle().pipe(
      map((data) => {
        return {
          ...genericResponse,
          data: data?.data || data,
          meta: data?.meta,
          links: data?.links,
        };
      }),
      catchError((error) => {
        console.log("error", error);
        let errorResponse: ErrorResponseDto;

        if (QUERY_ERRORS.includes(error.name)) {
          const instanceError = new ErrorInstanceDto(
            "database",
            error.detail,
            error.detail,
          );
          errorResponse = {
            ...genericResponse,
            message: error.name,
            statusCode: HttpStatus.CONFLICT,
            error: instanceError,
          };
        } else {
          errorResponse = {
            ...genericResponse,
            message: error.response.error,
            statusCode:
              error.status || context.switchToHttp().getResponse().statusCode,
            error: error.response,
          };

          if (error.response && !error.response?.domain) {
            errorResponse.error = new ErrorInstanceDto(
              "application",
              error.response.message,
              error.message,
            );
          }
        }

        return throwError(() => ({ response: errorResponse }));
      }),
    );
  }
}

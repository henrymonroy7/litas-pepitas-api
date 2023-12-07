export class ErrorInstanceDto {
  domain: string;
  reason: string;
  message: string;

  constructor(domain: string, reason: string, message: string) {
    this.domain = domain;
    this.reason = reason;
    this.message = message;
  }
}

export class ValidationError extends Error {
  readonly status: number = 400;
  readonly expose: boolean = true;
  message: string;

  constructor(message: string) {
    super(message);

    this.message = this.message || message;
  }
}

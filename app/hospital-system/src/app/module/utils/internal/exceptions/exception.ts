export class Exception extends Error {

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, Exception.prototype);
    this.stack = 'Exception';
  }

  toString(): string {
    return `${this.stack}: ${this.message}`;
  }

}

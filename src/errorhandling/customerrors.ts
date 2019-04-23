export class AuthError extends Error {
  constructor() {
    super("Account is not authorized.");
    // TODO: `Unique constraint violated on Account. Mutation did not complete. Field = ${field}`
    this.name = this.constructor.name;

    // This clips the constructor invocation from the stack trace.
    // It's not absolutely essential, but it does make the stack trace a little nicer.
    Error.captureStackTrace(this, this.constructor);
  }
}

export class UniqueConstraintViolationError extends Error {
  constructor() {
    super(`Unique constraint violated on Account. Mutation did not complete.`);
    // TODO: `Unique constraint violated on Account. Mutation did not complete. Field = ${field}`
    this.name = this.constructor.name;

    // This clips the constructor invocation from the stack trace.
    // It's not absolutely essential, but it does make the stack trace a little nicer.
    Error.captureStackTrace(this, this.constructor);
  }
}

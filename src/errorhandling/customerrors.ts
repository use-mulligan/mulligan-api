export class AuthError extends Error {
  constructor() {
    super("Account is not authorized.");
    // TODO: `Unique constraint violated on Account. Mutation did not complete. Field = ${field}`
    this.name = this.constructor.name;
  }
}

export class UniqueConstraintViolationError extends Error {
  constructor() {
    super(`Unique constraint violated on Account. Mutation did not complete.`);
    // TODO: `Unique constraint violated on Account. Mutation did not complete. Field = ${field}`
    this.name = this.constructor.name;
  }
}

export class QueryFailedError extends Error {
  constructor(ex) {
    super(ex);

    this.name = this.constructor.name;
    this.message = ex.message;
    this.stack = ex.stack;

    // This clips the constructor invocation from the stack trace.
    // It's not absolutely essential, but it does make the stack trace a little nicer.
    ex.captureStackTrace(this, this.constructor);
  }
}

export class MutationFailedError extends Error {
  constructor(ex) {
    super(ex);

    this.name = this.constructor.name;
    this.message = ex.message;
    this.stack = ex.stack;

    // This clips the constructor invocation from the stack trace.
    // It's not absolutely essential, but it does make the stack trace a little nicer.
    ex.captureStackTrace(this, this.constructor);
  }
}

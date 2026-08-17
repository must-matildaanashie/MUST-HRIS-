/** A user-facing, expected error (e.g. failed validation). Maps to HTTP 400. */
export class ValidationError extends Error {
  status = 400;
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

/** Insufficient permissions. Maps to HTTP 403. */
export class ForbiddenError extends Error {
  status = 403;
  constructor(message = "You don't have permission to do that.") {
    super(message);
    this.name = "ForbiddenError";
  }
}

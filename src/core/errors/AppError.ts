export type AppErrorKind = 'network' | 'http' | 'business' | 'parse' | 'unknown';

export class AppError extends Error {
  readonly kind: AppErrorKind;
  readonly status?: number;
  readonly errno?: number;

  constructor(
    kind: AppErrorKind,
    message: string,
    options?: { status?: number; errno?: number; cause?: unknown },
  ) {
    super(message);
    this.name = 'AppError';
    this.kind = kind;
    this.status = options?.status;
    this.errno = options?.errno;
    if (options?.cause !== undefined) {
      (this as { cause?: unknown }).cause = options.cause;
    }
  }

  static network(cause: unknown) {
    return new AppError('network', 'Network request failed — is the mock server running?', {
      cause,
    });
  }

  static business(errno: number, message = `API returned errno ${errno}`) {
    return new AppError('business', message, { errno });
  }

  static parse(cause: unknown) {
    return new AppError('parse', 'Could not parse the response', { cause });
  }
}

export function toAppError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error;
  }
  if (error instanceof Error) {
    return new AppError('unknown', error.message, { cause: error });
  }
  return new AppError('unknown', String(error));
}

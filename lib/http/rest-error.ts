type TRestError =
  | {
      code: number;
      error: string;
      params: unknown;
      name?: string;
    }
  | (Error & { params: unknown });

type TErrorType =
  | 'AUTH_DECLINED'
  | 'MISSING_INPUT_PARAM'
  | 'INVALID_INPUT_PARAM'
  | 'NOT_FOUND'
  | 'INTERNAL_SERVER_ERROR';

class RestError extends Error {
  private readonly code!: number;
  private readonly error!: string;
  private readonly errorType!: TErrorType;
  private readonly params!: unknown;

  /**
   * Set default values of CustomError class
   * @param {object|Error} error - Either pass an built-un Error or Error Object from API
   */
  constructor(error: TRestError) {
    let errorMessage = '';

    if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = error.error;
    }

    super(errorMessage);

    if (!(error instanceof Error)) {
      this.name = error.name || 'RestError';
      this.code = error.code;
    }

    this.error = errorMessage;
    this.message = errorMessage;
    const errorType = this.getErrorType(this.code);
    this.errorType = errorType;
    if (error.params) {
      this.params = error.params;
    }
  }

  getErrorType(code: number): TErrorType {
    switch (code) {
      case 0:
        return 'AUTH_DECLINED';

      case 1:
        return 'MISSING_INPUT_PARAM';

      case 2:
        return 'INVALID_INPUT_PARAM';

      case 404:
        return 'NOT_FOUND';

      default:
        return 'INTERNAL_SERVER_ERROR';
    }
  }
}

export default RestError;

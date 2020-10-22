'use strict';

class RestError extends Error {

  /**
   * Set default values of CustomError class
   * @param {object|Error} error - Either pass an built-un Error or Error Object from API
   */
  constructor(error) {
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

  getErrorType(code) {
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

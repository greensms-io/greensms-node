class RestError {
  constructor(errorResponse) {
    this.error = errorResponse.error;
    this.code = errorResponse.code;
    const errorType = this.getErrorType(this.code);
    this.errorType = errorType;
  }

  getErrorType(code) {
    switch (code) {
      case 0:
        return 'AUTH_DECLINED';

      case 1:
        return 'MISSING_INPUT_PARAM';

      case 2:
        return 'INVALID_INPUT_PARAM';

      default:
        return 'INTERNAL_SERVER_ERROR';
    }
  }

}

export default RestError;

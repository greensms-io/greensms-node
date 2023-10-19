type TRestError = {
    code: number;
    error: string;
    params: unknown;
    name?: string;
} | (Error & {
    params: unknown;
});
type TErrorType = 'AUTH_DECLINED' | 'MISSING_INPUT_PARAM' | 'INVALID_INPUT_PARAM' | 'NOT_FOUND' | 'INTERNAL_SERVER_ERROR';
declare class RestError extends Error {
    private readonly code;
    private readonly error;
    private readonly errorType;
    private readonly params;
    /**
     * Set default values of CustomError class
     * @param {object|Error} error - Either pass an built-un Error or Error Object from API
     */
    constructor(error: TRestError);
    getErrorType(code: number): TErrorType;
}
export default RestError;

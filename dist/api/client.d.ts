import type { AnySchema } from 'yup';
type TGreenSMSOptions = {
    user?: string | null;
    pass?: string | null;
    token?: string | null;
};
export declare class Client {
    private readonly token?;
    private readonly user?;
    private readonly pass?;
    private readonly restClient;
    /**
     * Initialize GreenSMS Client
     * @param {object} opts - Options
     * @param {string|null} opts.user - Username. Required when AuthToken is not passed
     * @param {string|null} opts.pass - Password. Request when AuthToken is not passed
     * @param {string|null} opts.token - AuthToken. Required when Username/Password not passed
     */
    constructor({ user, pass, token }?: TGreenSMSOptions);
    private getHttpClient;
    request<T>(method: 'GET' | 'POST', urlArgs: string[], schema?: AnySchema, params?: Record<string, unknown>): Promise<T>;
}
export {};

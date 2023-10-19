type TRestClientRequestOptions = {
    method?: 'GET' | 'POST';
    uri?: string;
    headers?: Record<string, unknown>;
    params?: Record<string, unknown>;
    data?: Record<string, unknown>;
    timeout?: number;
    allowRedirects?: boolean;
    forever?: boolean;
    logLevel?: boolean;
};
type TRestClientOptions = {
    token?: string | null;
    params?: Record<string, unknown>;
    data?: Record<string, unknown>;
};
declare class RestClient {
    private readonly service;
    private readonly token?;
    private readonly defaultData?;
    private readonly defaultParams?;
    private readonly sdkVersionHeader;
    /**
     * Create an instance of RestClient
     * @param {object} opts - Options
     * @param {string} opts.token - Default token for the request
     * @param {object} opts.params - Default params for the request
     * @param {object} opts.data - Default data for the request
     */
    constructor(opts?: TRestClientOptions);
    /**
     * Generic function to send requests to Axios
     *
     * @param {object} opts - Options argument
     * @param {string} opts.method - HTTP method
     * @param {string} opts.uri - Request URI
     * @param {object} [opts.headers] - The request headers
     * @param {object} [opts.params] - Request Params
     * @param {object} [opts.data] - Request Data
     * @param {int} [opts.timeout=30000] - Request timeout in milliseconds
     * @param {boolean} [opts.allowRedirects] - Should the client follow redirects
     * @param {boolean} [opts.forever] - Set to true to use the forever-agent
     * @param {string} [opts.logLevel] - Show debug logs
     */
    request<T>(opts?: TRestClientRequestOptions): Promise<T>;
    private addInterceptors;
}
export default RestClient;

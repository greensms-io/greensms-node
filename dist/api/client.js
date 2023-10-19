import RestClient from '../http/rest-client';
import { validate } from '../util/validator';
import { baseUrl, buildUrl } from '../util/url';
export class Client {
    token;
    user;
    pass;
    restClient;
    /**
     * Initialize GreenSMS Client
     * @param {object} opts - Options
     * @param {string|null} opts.user - Username. Required when AuthToken is not passed
     * @param {string|null} opts.pass - Password. Request when AuthToken is not passed
     * @param {string|null} opts.token - AuthToken. Required when Username/Password not passed
     */
    constructor({ user, pass, token } = {}) {
        if (token) {
            this.token = token;
        }
        if (!token) {
            this.token = process.env.GREENSMS_TOKEN;
        }
        if (!token && !user) {
            user = process.env.GREENSMS_USER;
        }
        if (!token && !pass) {
            pass = process.env.GREENSMS_PASS;
        }
        if (!this.token && (!user || !pass)) {
            throw new Error('Either User/Pass or Auth Token is required!');
        }
        else if (user) {
            this.user = user;
            this.pass = pass;
        }
        this.restClient = this.getHttpClient();
    }
    getHttpClient() {
        const params = {};
        if (!this.token && this.user) {
            params.user = this.user;
            params.pass = this.pass;
        }
        const httpClientOptions = {
            params,
            token: this.token,
        };
        return new RestClient(httpClientOptions);
    }
    request(method, urlArgs, schema, params) {
        const apiUrl = buildUrl(baseUrl(), ...urlArgs);
        const requestObj = {
            method: method,
            params,
            uri: apiUrl,
        };
        if (params && schema) {
            const errors = validate(schema, params);
            if (errors) {
                return Promise.reject(errors);
            }
        }
        return this.restClient.request(requestObj);
    }
}
//# sourceMappingURL=client.js.map
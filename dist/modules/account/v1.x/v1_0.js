import * as Yup from 'yup';
export class V1_0 {
    client;
    schema = {
        token: Yup.object().shape({
            expire: Yup.number().positive().integer(),
        }),
    };
    constructor(client) {
        this.client = client;
    }
    balance() {
        return this.client.request('GET', ['account', 'balance']);
    }
    token(params) {
        return this.client.request('POST', ['account', 'token'], this.schema.token, params);
    }
    tariff() {
        return this.client.request('GET', ['account', 'tariff']);
    }
}
//# sourceMappingURL=v1_0.js.map
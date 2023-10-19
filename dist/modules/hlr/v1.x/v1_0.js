import * as Yup from 'yup';
export class V1_0 {
    client;
    schema = {
        send: Yup.object().shape({
            to: Yup.string().required().min(11).max(14).matches(/^\d+$/, 'Invalid Phone Number'),
        }),
        status: Yup.object().shape({
            id: Yup.string().required().length(36),
            to: Yup.string().required().min(11).max(14).matches(/^\d+$/, 'Invalid Phone Number'),
        }),
    };
    constructor(client) {
        this.client = client;
    }
    send(params) {
        return this.client.request('POST', ['hlr', 'send'], this.schema.send, params);
    }
    status(params) {
        return this.client.request('GET', ['hlr', 'status'], this.schema.status, params);
    }
}
//# sourceMappingURL=v1_0.js.map
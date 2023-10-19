import * as Yup from 'yup';
export class V1_0 {
    client;
    schema = {
        receive: Yup.object().shape({
            tag: Yup.string().min(1).max(36),
            to: Yup.string().required().min(11).max(14).matches(/^\d+$/, 'Invalid Phone Number'),
            tollFree: Yup.boolean(),
        }),
        send: Yup.object().shape({
            language: Yup.string().oneOf(['ru', 'en']),
            tag: Yup.string().min(1).max(36),
            to: Yup.string().required().min(11).max(14).matches(/^\d+$/, 'Invalid Phone Number'),
            voice: Yup.boolean(),
        }),
        status: Yup.object().shape({
            extended: Yup.boolean(),
            id: Yup.string().required().length(36),
        }),
    };
    constructor(client) {
        this.client = client;
    }
    receive(params) {
        return this.client.request('POST', ['call', 'receive'], this.schema.receive, params);
    }
    send(params) {
        return this.client.request('POST', ['call', 'send'], this.schema.send, params);
    }
    status(params) {
        return this.client.request('GET', ['call', 'status'], this.schema.status, params);
    }
}
//# sourceMappingURL=v1_0.js.map
import * as Yup from 'yup';
export class V1_0 {
    client;
    schema = {
        send: Yup.object().shape({
            lang: Yup.string().oneOf(['ru', 'en']),
            tag: Yup.string().min(1).max(36),
            to: Yup.string().required().min(11).max(14).matches(/^\d+$/, 'Invalid Phone Number'),
            txt: Yup.string().required().min(1).max(5).matches(/^\d+$/, 'Invalid Code'),
        }),
        status: Yup.object().shape({
            extended: Yup.boolean(),
            id: Yup.string().required().length(36),
        }),
    };
    constructor(client) {
        this.client = client;
    }
    send(params) {
        return this.client.request('GET', ['voice', 'send'], this.schema.send, params);
    }
    status(params) {
        return this.client.request('GET', ['voice', 'status'], this.schema.status, params);
    }
}
//# sourceMappingURL=v1_0.js.map
import * as Yup from 'yup';
export class V1_0 {
    client;
    schema = {
        send: Yup.object().shape({
            cascade: Yup.string().oneOf(['sms', 'voice']),
            from: Yup.string().min(1),
            to: Yup.string().required().min(11).max(14).matches(/^\d+$/, 'Invalid Phone Number'),
            txt: Yup.string().required().min(1),
        }),
        status: Yup.object().shape({
            extended: Yup.boolean(),
            id: Yup.string().required().length(36),
        }),
    };
    constructor(client) {
        this.client = client;
    }
    async send(params) {
        return this.client.request('GET', ['viber', 'send'], this.schema.send, params);
    }
    async status(params) {
        return this.client.request('GET', ['viber', 'status'], this.schema.status, params);
    }
}
//# sourceMappingURL=v1_0.js.map
import * as Yup from 'yup';
const NUMBER_OR_UUID_REGEXP = /^(\d+)|([0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12})$/gi;
export class V1_0 {
    client;
    schema = {
        send: Yup.object().shape({
            amount: Yup.number().required().min(1).positive(),
            card: Yup.string().min(11).max(14),
            tag: Yup.string().min(1).max(36),
            to: Yup.string().required().min(11).max(14).matches(/^\d+$/, 'Invalid Phone Number'),
        }),
        status: Yup.object().shape({
            extended: Yup.boolean(),
            id: Yup.string().required().min(1).max(36).matches(NUMBER_OR_UUID_REGEXP, 'Invalid Status'),
        }),
    };
    constructor(client) {
        this.client = client;
    }
    send(params) {
        return this.client.request('POST', ['pay', 'send'], this.schema.send, params);
    }
    status(params) {
        return this.client.request('GET', ['pay', 'status'], this.schema.status, params);
    }
}
//# sourceMappingURL=v1_0.js.map
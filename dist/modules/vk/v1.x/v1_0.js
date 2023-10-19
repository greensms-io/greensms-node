import * as Yup from 'yup';
export class V1_0 {
    client;
    schema = {
        send: Yup.object().shape({
            cascade: Yup.array()
                .transform(function (value, originalValue) {
                if (this.isType(value) && value !== null) {
                    return value;
                }
                return originalValue ? originalValue.split(/[\s,]+/) : [];
            })
                .of(Yup.string().oneOf(['sms', 'voice', 'viber'])),
            from: Yup.string().min(1).max(11),
            tag: Yup.string().min(1).max(36),
            to: Yup.string().required().min(11).max(14).matches(/^\d+$/, 'Invalid Phone Number'),
            txt: Yup.string().required().min(1).max(2048),
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
        return this.client.request('GET', ['vk', 'send'], this.schema.send, params);
    }
    status(params) {
        return this.client.request('GET', ['vk', 'status'], this.schema.status, params);
    }
}
//# sourceMappingURL=v1_0.js.map
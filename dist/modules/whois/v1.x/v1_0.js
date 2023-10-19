import * as Yup from 'yup';
export class V1_0 {
    client;
    schema = {
        lookup: Yup.object().shape({
            to: Yup.string().required().min(11).max(14).matches(/^\d+$/, 'Invalid Phone Number'),
        }),
    };
    constructor(client) {
        this.client = client;
    }
    lookup(params) {
        return this.client.request('GET', ['whois', 'lookup'], this.schema.lookup, params);
    }
}
//# sourceMappingURL=v1_0.js.map
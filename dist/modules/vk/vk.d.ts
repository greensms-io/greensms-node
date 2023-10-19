import { Client } from 'api/client';
import { V1_0 } from './v1.x';
export declare class Vk {
    private readonly client;
    private _v1;
    constructor(client: Client);
    get v1(): V1_0;
}

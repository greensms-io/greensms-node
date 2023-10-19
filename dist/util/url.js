import { BASE_URL, URL_PROTOCOL } from './../constants';
/**
 * Get base url of the API
 * @returns {string}
 */
export const baseUrl = () => {
    const url = new URL('http://127.0.0.1');
    url.protocol = URL_PROTOCOL;
    url.hostname = BASE_URL;
    return url.toString();
};
/**
 * Join to create an absolute URL from Paths
 * @param {string} baseUrl - Base URL with protocol
 * @param {string[]} args - Array of paths to join. Can also include query strings
 * @returns {string} - Joined URL String
 */
export const buildUrl = (baseUrl, ...args) => {
    if (!baseUrl) {
        throw new Error('Base URL cannot be empty!');
    }
    if (!args) {
        args = [];
    }
    const url = new URL(args.join('/'), baseUrl);
    return url.toString();
};
//# sourceMappingURL=url.js.map
/**
 * Get base url of the API
 * @returns {string}
 */
export declare const baseUrl: () => string;
/**
 * Join to create an absolute URL from Paths
 * @param {string} baseUrl - Base URL with protocol
 * @param {string[]} args - Array of paths to join. Can also include query strings
 * @returns {string} - Joined URL String
 */
export declare const buildUrl: (baseUrl: string, ...args: string[]) => string;

'use strict';

import URI from 'urijs';
import { BASE_URL, URL_PROTOCOL } from './../constants';

/**
 * Get base url of the API
 * @returns {string}
 */
export const baseUrl = () => {
  let uri = URI();
  uri.protocol(URL_PROTOCOL);
  uri.hostname(BASE_URL);
  uri = uri.toString();
  return uri;
};

/**
 * Join to create an absolute URL from Paths
 * @param {string} baseUrl - Base URL with protocol
 * @param  {string[]} args - Array of paths to join. Can also include query strings
 * @returns {string} - Joined URL String
 */
export const buildUrl = (baseUrl, ...args) => {
  if (!baseUrl) {
    throw new Error('Base URL cannot be empty!');
  }

  if (!args) {
    args = [];
  }

  let uri = URI.joinPaths(...args);
  uri = uri.absoluteTo(baseUrl).preventInvalidHostname(true);

  if (!uri.hostname() || !uri.protocol()) {
    throw new Error('Invalid URL');
  }

  uri = uri.toString();
  return uri;
};

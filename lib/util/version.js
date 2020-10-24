'use strict';

import { VERSIONS } from './../constants';

/**
 * Returns Version from VersionMap
 * @param {string} version - Input Version as V1, V2, etc.
 */
export const getVersion = version => {
  if (!version) {
    return VERSIONS.v1;
  }

  version = version.toLowerCase();

  if (!VERSIONS[version]) {
    throw new Error('Invalid Version');
  }

  return VERSIONS[version];
};

import { VERSIONS } from './constants';
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

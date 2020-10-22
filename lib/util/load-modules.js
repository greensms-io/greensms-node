import glob from 'fast-glob';

export const loadModules = () => {

  const moduleDict = {};

  const moduleBasePath = './lib/api/';
  const modules = glob.sync(`${moduleBasePath}**/*.js`, { ignore: ['*/schema.js']});
  console.log('Edn', modules);
};

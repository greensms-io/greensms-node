import glob from 'fast-glob';

export const loadModules = () => {

  const moduleDict = {};

  const moduleBasePath = './lib/api/';
  const requireBasePath = './../api/';
  const modules = glob.sync(`${moduleBasePath}**/*.js`, { ignore: [`${moduleBasePath}schema.js`]});

  modules.forEach(filePath => {
    const trimmedPath = filePath.replace(moduleBasePath, '');
    const basePath = trimmedPath.replace('.js', '');
    const [moduleName, version] = basePath.split('/');
    moduleDict[moduleName] = {
      version: require(`${requireBasePath}${trimmedPath}`),
    };
  });

  console.log('Module Dict');
};

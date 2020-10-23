import Modules from './modules';
import { buildUrl } from './../util/url';
import { validate } from './../util/validator';

class ModuleLoader {

  constructor() {
    this.moduleMap = {};
  }

  registerModules(sharedOptions) {

    const currentVersion = sharedOptions.version;

    for (let moduleName in Modules) {

      if (!this.moduleMap[moduleName]) {
        this.moduleMap[moduleName] = {};
      }
      const moduleInfo = Modules[moduleName];
      const moduleVersions = moduleInfo.versions;
      const moduleSchema = moduleInfo.schema;

      for (let version in moduleVersions) {

        if (!this.moduleMap[moduleName][version]) {
          this.moduleMap[moduleName][version] = {};
        }

        const versionFunctions = moduleVersions[version];

        for (let func in versionFunctions) {

          if (this.moduleMap[moduleName][version][func]) {
            continue;
          }

          const funcDefinition = versionFunctions[func];
          let functionArgs = [];
          if (funcDefinition.args && funcDefinition.args.length > 0) {
            functionArgs = [...funcDefinition.args];
          }

          this.moduleMap[moduleName][version][func] = function(...args) {

            let callback = null;
            let params = {};

            if (!args) {
              args = [];
            }

            const [lastItem] = args.slice(-1);
            if (lastItem && typeof lastItem === 'function') {
              callback = lastItem;
              args.pop();
            }

            if (args[0]) { // Assumption is to have params, callback as the parameters
              params = args[0];
            }

            const apiUrl = buildUrl(sharedOptions.baseUrl, moduleName, func);

            const promise = new Promise((resolve, reject) => {

              const requestObj = {
                uri: apiUrl,
                method: funcDefinition.method,
              };

              if (params) {
                if (moduleSchema[version] && moduleSchema[version][func]) {
                  let errors = validate(moduleSchema[version][func], params);
                  if (errors) {
                    return reject(errors);
                  }
                }
                requestObj.params = { ...params};
              }

              sharedOptions.restClient.request(requestObj).then(resolve).catch(reject);

            });

            if (callback !== null && typeof callback === 'function') {
              promise.then(function (data) {
                return callback(null, data);
              }).catch(function (err) {
                return callback(err);
              });
            } else {
              return promise;
            }

          };

          if (version === currentVersion) {
            this.moduleMap[moduleName][func] = this.moduleMap[moduleName][version][func];
          }
        }
      }
    }

    return this.moduleMap;
  }
}

const instance = new ModuleLoader();
Object.freeze(instance); // Create a Singleton Instance

export default instance;

import Modules from './modules';
import { buildUrl } from './../util/url';
import { validate } from './../util/validator';

class ModuleLoader {

  constructor() {
    this.moduleMap = {};
  }

  registerModules(sharedOptions, filters) {

    if (!filters) {
      filters = {};
    }

    const currentVersion = sharedOptions.version;

    // Layered approach for Module > Version > Function
    for (let moduleName in Modules) {

      if (!this.moduleMap[moduleName]) {
        this.moduleMap[moduleName] = {};
      }
      const moduleInfo = Modules[moduleName];
      const moduleVersions = moduleInfo.versions;
      const moduleSchema = moduleInfo.schema;

      if (filters.loadStatic === true && moduleInfo.static !== true) {
        continue;
      }

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

          // Define dynamic functions for each API
          this.moduleMap[moduleName][version][func] = function (...args) {

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

            // Build dynamic URL
            const urlArgs = [sharedOptions.baseUrl];
            if (moduleInfo.static !== true) {
              urlArgs.push(moduleName);
            }
            urlArgs.push(func);

            const apiUrl = buildUrl(...urlArgs);

            const promise = new Promise((resolve, reject) => {

              const requestObj = {
                uri: apiUrl,
                method: funcDefinition.method,
              };

              // If API has params, then we validate and append to request object
              if (params) {
                if (moduleSchema && moduleSchema[version] && moduleSchema[version][func]) {
                  let errors = validate(moduleSchema[version][func], params);
                  if (errors) {
                    return reject(errors);
                  }
                }
                requestObj.params = { ...params };
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

          if (moduleInfo.static === true) {
            this.moduleMap[func] = this.moduleMap[moduleName][version][func];
            delete this.moduleMap[moduleName]; // Remove static functio mapping

          }
        }
      }
    }
    return this.moduleMap;
  }
}

export default ModuleLoader;

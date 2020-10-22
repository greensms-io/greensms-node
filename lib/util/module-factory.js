class ModuleFactory {

  constructor() {
    this.registeredModules = new Map();
  }

  static instance()

  register(moduleName, moduleClass) {
    if(!this.registeredModules.has(moduleName)) {
      this.registeredModules.set(moduleName, moduleClass);
    }
  }

  create(moduleName, ...options) {
    if(this.registeredModules.has(moduleName)) {
      throw new Error(`Module ${moduleName} not registered!`);
    }

    let modelClass = this.registeredModules.get(moduleName);
    let instance = new modelClass(options).getInstance();
    return instance;
  }
}

const instance = new ModuleFactory();
Object.freeze(instance);

export default instance;
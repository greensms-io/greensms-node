import V1 from './v1';

class Sms {
  constructor(opts) {
    this.options = opts;
    this._v1 = new V1(opts);
  }

  getInstance() {
    if (this.options.version && this.options.version === 'v1') {
      return this._v1;
    }

    return this._v1;
  }

}

export default Sms;

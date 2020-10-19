'use strict';

class GreenSMS {
  constructor({
    username,
    password,
    token,
  }) {
    if (token) {
      this.token = token;
    }

    if (!this.token && (!username || !password)) {
      throw new Error('Either User/Pass or Auth Token is required!');
    }

    console.log('Success');
  }

}

export default GreenSMS;

'use strict';

const { greenSmsInstance } = require('./greensms');

const lookupParams = {
  to: '792612345678',
};

greenSmsInstance.whois.lookup(lookupParams).then((data) => console.log('Lookup Data', data)).catch(err => console.error('Lookup Error', err));

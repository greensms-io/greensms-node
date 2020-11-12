'use strict';

const { greenSmsInstance } = require('./greensms');

const lookupParams = {
  to: '4477743336335',
};

greenSmsInstance.whois.lookup(lookupParams).then((data) => console.log('Lookup Data', data)).catch(err => console.error('Lookup Error', err));

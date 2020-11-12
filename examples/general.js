'use strict';

const { greenSmsInstance } = require('./greensms');

greenSmsInstance.status().then(data => console.log('Status Data', data)).catch(err => console.error('Status Error', err));

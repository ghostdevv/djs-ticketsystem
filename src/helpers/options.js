
var options = require('../defaults/options.js');
const clonedeep = require('lodash.clonedeep');

module.exports = {
    get: () => clonedeep(Object.assign({}, options)),
    default: (opt = {}) => options = clonedeep(Object.assign(options, opt)),
};
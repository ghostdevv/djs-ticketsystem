
var options = require('../defaults/options.js');

module.exports = {
    get: () => Object.assign({}, options),
    default: (opt = {}) => options = Object.assign(options, opt),
};
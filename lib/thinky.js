const config = require('../config.json');
const thinky = require('thinky')({db: config.db});
module.exports = thinky;
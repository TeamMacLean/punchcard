var app = require('./app');
var config = require('./config.json');
var Log = require('./lib/log');

/**
 * Start the server
 */

app.listen(config.port, '0.0.0.0', function () {
    Log.log('Listening on port', config.port);
});
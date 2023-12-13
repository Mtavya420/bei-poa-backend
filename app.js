
require('express-async-errors');
const express = require('express');
const app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();


// error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500).json({
        error: {
            message: err.message,
            stack: req.app.get('env') === 'development' ? err.stack : undefined,
        },
    });
});

module.exports = app;

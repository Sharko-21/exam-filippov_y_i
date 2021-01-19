const bodyParser = require('body-parser');
const express  = require('express');

function init(app) {
    app.use(bodyParser.json());       // to support JSON-encoded bodies
    app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
        extended: true
    }));
    app.use('/static', express.static(process.cwd() + '/static'));
}

module.exports = {
    init
};
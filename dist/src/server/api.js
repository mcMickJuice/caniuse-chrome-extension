'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.runApp = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _service = require('./service');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();


app.use(_bodyParser2.default.json());

app.get('/feature', (req, res) => {
    const query = req.query.query;
    (0, _service.queryFeatures)(query).then(results => {
        res.send(results);
    }).catch(err => {
        res.status(500).send(`an error occurred ${err}`);
    });
});

app.get('/support', (req, res) => {
    const feature = req.query.feature;

    (0, _service.querySupport)(feature).then(results => {
        res.send(results);
    }).catch(err => {
        res.status(500).send(`An error has occurred ${err}`);
    });
});

const runApp = exports.runApp = port => {

    return new Promise((resolve, reject) => {
        app.listen(port, err => {
            if (err) {
                console.log('error starting app');
                return reject();
            }

            console.log(`Api started at localhost:${port}`);
            resolve();
        });
    });
};
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.querySupport = exports.queryFeatures = undefined;

var _caniuseApi = require('caniuse-api');

var api = _interopRequireWildcard(_caniuseApi);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const hasKey = (obj, key) => {
    return Object.keys(obj).indexOf(key) > -1;
};


const browserMap = {
    'and_chr': 'Chrome for Android',
    'and_ff': 'Firefox for Android',
    'and_qq': 'QQ Browser',
    'and_uc': 'UC Browser for Android',
    'android': 'Android Browser',
    'baidu': 'Baidu',
    'bb': 'Blackberry',
    'chrome': 'Chrome',
    'edge': 'Edge',
    'firefox': 'Firefox',
    'ie': 'Internet Explorer',
    'ie_mob': 'IE Mobile',
    'ios_saf': 'iOS Safari',
    'op_mini': 'Opera Mini',
    'op_mob': 'Opera Mobile',
    'opera': 'Opera',
    'safari': 'Safari',
    'samsung': 'Samsung Internet'
};

const mapBrowserToSupport = (browserKey, browser) => {
    let isSupported = false;
    if (hasKey(browser, 'y')) {
        isSupported = true;
    }

    return {
        browserKey,
        isSupported,
        browserName: browserMap[browserKey] //TODO have mapper??
    };
};

const queryFeatures = exports.queryFeatures = query => {
    return new Promise(resolve => {
        const result = api.find(query);

        if (typeof result === 'string') {
            resolve([result]);
            return;
        }
        resolve(result);
    });
};

const querySupport = exports.querySupport = feature => {
    return new Promise(resolve => {
        const resultMap = api.getSupport(feature);

        const supportResults = Object.keys(resultMap).map(key => {
            return mapBrowserToSupport(key, resultMap[key]);
        });

        resolve(supportResults);
    });
};
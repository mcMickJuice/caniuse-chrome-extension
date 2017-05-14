//@flow
import * as api from 'caniuse-api'

const hasKey = (obj: {}, key: string): boolean => {
    return Object.keys(obj).indexOf(key) > -1;
}

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
}

export type browserFeatureRaw = {
    a: ?number,
    x: ?number,
    '#1': ?number,
    y: ?number
}

export type browserSupport = {
    browserName: string,
    browserKey: string,
    isSupported: boolean
}

const mapBrowserToSupport = (browserKey: string, browser: browserFeatureRaw): browserSupport => {
    let isSupported = false;
    if (hasKey(browser, 'y')) {
        isSupported = true
    }

    return {
        browserKey,
        isSupported,
        browserName: browserMap[browserKey] //TODO have mapper??
    }
}

export const queryFeatures = (query: string): Promise<string[]> => {
    return new Promise(resolve => {
        const result: string | string[] = api.find(query)

        if (typeof result === 'string') {
            resolve([result])
            return;
        }
        resolve(result);
    })
}

export const querySupport = (feature: string): Promise<browserSupport[]> => {
    return new Promise(resolve => {
        const resultMap = api.getSupport(feature);

        const supportResults = Object.keys(resultMap).map(key => {
            return mapBrowserToSupport(key, resultMap[key])
        })

        resolve(supportResults)
    })
}
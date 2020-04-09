'use strict';
const _ = require('lodash');
const boolean = require('boolean');
const errors = require('../errors');
/**
 * @param {string} source
 * @param {object} format
 * @return {Function}
 */
module.exports = function arrangeBody(source, format) {
    if (!['body', 'query'].includes(source)) {
        throw new Error(`Invalid 'arrangeBody' source '${source}'.`);
    }
    Object.keys(format).forEach(function (key) {
        let config = format[key];
        if (typeof config !== 'string' && !_.isPlainObject(config)) {
            throw new Error(`Invalid 'arrangeBody' configuration for '${key}' param`);
        }
        if (typeof config === 'string') {
            format[key] = config = {type: config};
        }
        if (!('type' in config)) {
            throw new Error(`Invalid 'arrangeBody' configuration for '${key}' param`);
        }
        if ('possible' in config &&
            (!_.isFunction(config.possible) && !_.isArray(config.possible))
        ) {
            throw new Error(`Invalid 'arrangeBody' config: '${key}.possible' must be an array or a function, but ${typeof config.possible} provided`);
        }
        if ('pattern' in config && !(config.pattern instanceof RegExp)) {
            throw new Error(`Invalid 'arrangeBody' config: '${key}.pattern' must be an RexExp, but ${typeof config.pattern} provided`);
        }
    });
    return function (req, res, next) {
        const input = req[source];
        let arranged, config, key, value;
        req['arranged' + _.capitalize(source)] = arranged = {};
        for (key in format) {
if (format.hasOwnProperty(key)) {
            config = format[key];
            value = input[key];
            if (value === undefined && config.defaultValue) value = config.defaultValue;
            if (!value && config.required) {
                return next(errors.InvalidInputError(`Property '${key}' is required`));
            }
            if (value === undefined) continue;
            if (value !== null && config.transform) value = config.transform(value);
            if (config.pattern && (value !== null && !config.pattern.test(value))) {
                return next(errors.InvalidInputError(
                    `Invalid input param '${key}': doesn't follow expected pattern`
                ));
            }
            if (config.minLength && (value !== null && value.length < config.minLength)) {
                return next(errors.InvalidInputError(
                    `Invalid input param '${key}': doesn't follow expected min length ${config.minLength}`
                ));
            }
            if (config.maxLength && (value !== null && value.length > config.maxLength)) {
                return next(errors.InvalidInputError(
                    `Invalid input param '${key}': doesn't follow expected max length ${config.maxLength}`
                ));
            }
            if (value === null) {
                arranged[key] = null;
                continue;
            }
            if (config.type === 'BOOLEAN') {
                arranged[key] = boolean(value);
                continue;
            }
            if (config.type === 'INTEGER') {
                if (!_.isInteger(+value)) {
                    return next(errors.InvalidInputError(
                        `Invalid input param ${key}: expected integer at '${key}' param, but got '${value}'`
                    ));
                }
                arranged[key] = +value;
                continue;
            }
            if (config.type === 'STRING') {
                if (_.isFunction(config.possible) && !config.possible(value)) {
                    return next(errors.InvalidInputError(
                        `Invalid input param ${key}: '${value}' doesn't follow expected pattern`
                    ));
                }
                if (_.isArray(config.possible) && !config.possible.includes(value)) {
                    return next(errors.InvalidInputError(
                        `Invalid input param ${key}: '${value}' is not in variants list`
                    ));
                }
                arranged[key] = value;
                continue;
            }
            if (config.type === 'INTEGER[]') {
                if (!value || value.toLowerCase() === 'any') {
                    continue;
                }
                value = value.split(',');
                for (let i in value) {
                    if (!_.isInteger(+value[i])) {
                        return next(errors.InvalidInputError(
                            `Invalid input param ${key}: '${value[i]}' is not an integer`
                        ));
                    }
                }
                arranged[key] = value.map((v) => +v);
            }
            if (config.type === 'STRING[]') {
                if (!value || value.toLowerCase() === 'any') {
                    continue;
                }
                value = value.split(',');
                if (config.possible) {
                    for (let i in value) {
                        if (_.isFunction(config.possible) && !config.possible(value[i])) {
                            return next(errors.InvalidInputError(
                                `Invalid input param ${key}: '${value[i]}' doesn't follow expected pattern`
                            ));
                        }
                        if (_.isArray(config.possible) && !config.possible.includes(value[i])) {
                            return next(errors.InvalidInputError(
                                `Invalid input param ${key}: '${value[i]}' is not in variants list`
                            ));
                        }
                    }
                }
                arranged[key] = value;
            }
            if (config.type === 'OBJECT') {
                if (!value) continue;
                if (typeof value === 'string') {
                    try {
                        value = JSON.parse(value);
                    } catch (err) {
                        return next(errors.InvalidInputError(
                            `Invalid input param ${key}: value doesn't follow expected pattern`
                        ));
                    }
                }
                if (typeof value !== 'object') {
                    return next(errors.InvalidInputError(
                        `Invalid input param ${key}: value doesn't follow expected pattern`
                    ));
                }
                arranged[key] = value;
            }
        }
}
        next();
    };
};

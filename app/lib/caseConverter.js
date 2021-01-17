"use strict";

const _camelCase = require("camelcase");
const _decamelize = require("decamelize");
const _ = require("underscore");

module.exports = {
    camelCase: camelCase,
    underscore: underscore
};

function convert(obj, converter){
    if (obj === null){
        return null;
    }
    if (typeof obj === "undefined"){
        return obj;
    }
    if (typeof obj === "string"){
        return converter(obj);
    }
    if (obj instanceof Date){
        return obj;
    }
    if (obj instanceof Buffer){
        return obj;
    }
    if (obj instanceof Array){
        const result = [];
        for (let i = 0; i < obj.length; i++){
            if (typeof obj[i] === "object") {
                result.push(convert(obj[i], converter));
            }else{
                result.push(obj[i]);
            }
        }
        return result;
    }
    if (typeof obj === "object"){
        const result = _.extend({}, obj);
        for (const key in result){
            if (result.hasOwnProperty(key)) {
                let value = result[key];
                if (typeof value === "object"){
                    value = convert(value, converter);
                }
                delete result[key];
                if (Date.parse(key)){
                    // for ISO date keys
                    result[key] = value;
                } else {
                    result[converter(key)] = value;
                }
            }
        }
        return result;
    }
    return obj;
}

function camelCase(obj){
    return convert(obj, _camelCase);
}

function underscore(obj){
    return convert(obj, _decamelize);
}

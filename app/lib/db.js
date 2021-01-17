"use strict";

const camelCase = require("./caseConverter").camelCase;
const getConfig = require("./config");

const pgp = require("pg-promise")({
    // Initialization Options
});
/**
 * @type {{
 *  tx: (function(object)),
 *  one: (function(string, object):object),
 *  oneOrNone: (function(string, object):object),
 *  many: (function(string, object):Array),
 *  manyOrNone: (function(string, object):Array),
 *  none: (function(string, object))
 * }}
 */
const db = pgp(getConfig("db"));

const operations = ["one", "oneOrNone", "many", "manyOrNone", "none", "any", "tx"];

/**
 * @type {{
 *  tx: (function(object)),
 *  one: (function(string, object):object),
 *  oneOrNone: (function(string, object):object),
 *  many: (function(string, object):Array),
 *  manyOrNone: (function(string, object):Array),
 *  none: (function(string, object))
 * }}
 */
const myDb = {
    tx: _func => {
        return db.tx(originTransaction => {
            const myTransaction = {
                _downgrade() {
                    return originTransaction;
                }
            };
            operations.forEach(func => {
                myTransaction[func] = (sql, params) => {
                    return originTransaction[func](sql, params)
                        .then((res) => {
                            if (res instanceof Array){
                                return res.map(camelCase);
                            }else if (typeof res === "object"){
                                return camelCase(res);
                            }
                        });
                };
            });
            return _func(myTransaction);
        });
    }
};

operations.filter(operation => operation !== "tx").forEach(func => {
    myDb[func] = (sql, params) => {
        return db[func](sql, params)
            .then(res => {
                if (res instanceof Array){
                    return res.map(camelCase);
                }else if (typeof res === "object"){
                    return camelCase(res);
                }
                return res;
            });
    };
});

module.exports = myDb;

const sql = require('../../sql');
const db = require('../../lib/db');
const sqlHelpers = require('../../lib/sqlHelpers');
const search = require('../../lib/search');

function init(app) {
    app.get("/search", async (req, res) => {
        let result;
        switch (req.query.type) {
            case "ensemble":
                result = await search.ByEnsemble(req.query.filters);
                break;
            case "musician":
                console.log("here");
                result = await search.ByMusician(req.query.filters);
                console.log(result);
                break;
            case "composition":
                result = await search.ByComposition(req.query.filters);
                break;
            default:
                res.send("ooooops...");
                return
        }
        res.send(JSON.stringify({
            errNo: 0,
            response: result
        }));
    });

    app.get("/ensemble/:id/compositions", async (req, res) => {
        let result = {errNo: 0, response: []};
        console.log(req.params.id);
        try {
            let compositions = await db.manyOrNone(sql.composition.findByEnsembleID, {
                id: req.params.id,
            });
            console.log("ooo", compositions);
            if (compositions.length > 0) {
                result.response = compositions;
            }
            return res.send(JSON.stringify(result));
        } catch (e) {
            console.log(e);
            if (e.received === 0) {
                return res.send(JSON.stringify(result));
            }
            result.errNo = 1;
            return res.send(JSON.stringify(result));
        }
    });

    app.get("/compositions", async (req, res) => {
        let result = {errNo: 0, response: []};
        try {
            let compositions = await db.manyOrNone(sql.composition.findByIDs, {
                id: sqlHelpers.arrayToSqlIn([req.query.ids])
            });
            if (compositions.length > 0) {
                result.response = compositions;
            }
            return res.send(JSON.stringify(result));
        } catch (e) {
            if (e.received === 0) {
                return res.send(JSON.stringify(result));
            }
            result.errNo = 1;
            return res.send(JSON.stringify(result));
        }
    });

    app.get("/ensemble/:id/musicians", async (req, res) => {
        let result = {errNo: 0, response: []};
        console.log(req.params.id);
        try {
            let musicians = await db.manyOrNone(sql.musician.findByEnsembleID, {
                id: req.params.id,
            });
            console.log("ooo", musicians);
            if (musicians.length > 0) {
                result.response = musicians;
            }
            return res.send(JSON.stringify(result));
        } catch (e) {
            console.log(e);
            if (e.received === 0) {
                return res.send(JSON.stringify(result));
            }
            result.errNo = 1;
            return res.send(JSON.stringify(result));
        }
    });
}

module.exports = {
    init
};
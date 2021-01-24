const sql = require('../../sql');
const db = require('../../lib/db');
const sqlHelpers = require('../../lib/sqlHelpers');
const search = require('../../lib/search');

function init(app) {
    app.get("/search", async (req, res) => {
        let result;
        let errNo = 0;
        switch (req.query.type) {
            case "ensemble":
                result = await search.ByEnsemble(req.query.filters);
                break;
            case "musician":
                result = await search.ByMusician(req.query.filters);
                break;
            case "composition":
                result = await search.ByComposition(req.query.filters);
                break;
            case "plate":
                result = await search.ByPlate(req.query.filters);
                break;
            default:
                errNo = 1;
                break;
        }
        res.send(JSON.stringify({
            errNo: errNo,
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

    app.post("/plate/:id/buy", async (req, res) => {
        let result = {errNo: 0, response: []};
        return db.tx(async tx => {
            tx.none(sql.plate.buy, {
                plateID: req.params.id
            }).then(() => {
                res.send(JSON.stringify(result));
            });
        }).catch(e => {
            result.errNo = 1;
            res.send(result);
        });
    });

    app.post("/plate", async (req, res) => {
        let result = {errNo: 0, response: []};
        try {
            if (req.body.id !== 0) {
                await db.none(sql.plate.update, req.body);
            } else {
                await db.none(sql.plate.create, req.body);
            }
            return res.send(JSON.stringify(result));
        } catch (e) {
            result.errNo = 1;
            return res.send(JSON.stringify(result));
        }
    });

    app.post("/ensemble", async (req, res) => {
        let result = {errNo: 0, response: []};
        try {
            if (req.body.id !== 0) {
                await db.none(sql.ensemble.update, req.body);
            } else {
                await db.none(sql.ensemble.create, req.body);
            }
            return res.send(JSON.stringify(result));
        } catch (e) {
            result.errNo = 1;
            return res.send(JSON.stringify(result));
        }
    });
}

module.exports = {
    init
};
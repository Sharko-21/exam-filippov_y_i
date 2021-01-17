const db = require('../../lib/db');
const sql = require('../../sql');
const jade = require('jade');
const fs = require('fs');
const views = {};

function init(app) {
    loadViews();

    app.get("/", (req, res) => {
        res.sendFile('/var/app/static/views/index.html')
    });

    app.get("/musician/:id", async (req, res) => {
        try {
            let musician = await db.one(sql.musician.findByID, {
                id: req.params.id
            });
            res.send(jade.render(views.musician, {
                name: musician.name,
                date: new Date(musician.date),
                description: musician.description,
            }));
            console.log(musician)
        } catch (e) {
            console.log(e);
            res.send("Something went wrong...");
        }
    });
}

function loadViews() {
    let viewsPath = [
        "/var/app/static/views/musician.jade"
    ];
    viewsPath.forEach(viewPath => {
        fs.readFile(viewPath, (err, data) => {
            if (!err) {
                views.musician = data;
            } else {
                console.log(err);
            }
        })
    });
}


module.exports = {
    init
};
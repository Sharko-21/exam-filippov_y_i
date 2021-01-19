const views = require("./views");
const images = require("./images");

function init(app) {
    views.init(app);
    images.init(app);
}

module.exports = {
    init
};
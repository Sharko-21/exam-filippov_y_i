const errorHandler = (res) =>
    (error) => {
        console.error(error, error.stack);
        res.status(500).json(`{err :"UNKNOWN_ERROR", msg: "${error}"`);
    };

module.exports = {
    errorHandler
};

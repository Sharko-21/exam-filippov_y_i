function arrayToSqlIn(arr) {
    let res = '';
    arr.forEach((elem, i) => {
        res += elem;
        if (i !== arr.length - 1) {
            res += ","
        }
    });
    return res;
}

module.exports = {
    arrayToSqlIn
};
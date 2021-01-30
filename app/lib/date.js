const format = date => {
    let d = new Date(date);
    let month = d.getMonth()+1;
    let day = d.getDay();
    if (month < 10) {
        month = `0${month}`
    }
    if (day < 10) {
        day = `0${day}`;
    }
    return `${d.getFullYear()}-${month}-${day}`
};

module.exports = {
    format
};
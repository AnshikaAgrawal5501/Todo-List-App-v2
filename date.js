module.exports = getDate;

function getDate() {

    const today = new Date();

    options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const day = today.toLocaleDateString("en-US", options);

    return day;
}
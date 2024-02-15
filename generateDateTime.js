function addZero(z) {
    return z < 10 ? "0" + z : z;
}

function timeConverter(UNIX_timestamp) {

    let a = new Date(UNIX_timestamp * 1000);
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Aug', 'Sep', 'Oct', 'Now', 'Dec'];
    let year = a.getFullYear();
    let month = addZero(a.getMonth() + 1);
    let date = addZero(a.getDate());
    let hour = addZero(a.getHours());
    let min = addZero(a.getMinutes());
    let sec = addZero(a.getSeconds());
    let time = date + '.' + month + ' ' + hour + ':' + min;
    return time;
}

export {addZero, timeConverter}
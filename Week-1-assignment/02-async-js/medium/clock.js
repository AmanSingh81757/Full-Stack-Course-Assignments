
function printTime(){
    let time = new Date;
    console.clear();
    console.log(time.getHours()%12, ':', time.getMinutes(), ':', time.getSeconds(), `${time.getHours()<12?'AM':'PM'}`);
}
setInterval(printTime, 1000);
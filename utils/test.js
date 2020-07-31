setInterval(function () { // Set interval for checking
    var date = new Date(); // Create a Date object to find out what time it is
    console.log(date.getHours())
    console.log(date.getMinutes())
    if (date.getHours() === 18 && date.getMinutes() === 20) { // Check the time
        console.log("haha")
    }
}, 60000); 
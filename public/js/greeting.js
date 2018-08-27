// This code determines what time of the day it is, in order to properly greet the user
    var today = new Date();
    var hourNow = today.getHours();
    var greeting;

    if (hourNow > 18) {
        greeting = 'Good Evening!';
    } else if (hourNow > 12) {
        greeting = 'Good Afternoon!';
    } else if (hourNow > 0) {
        greeting = 'Good Morning!';
    } else {
        greeting = 'Greetings!'; 
    }
 
    document.write('<h2>'+ greeting + '</h2>');



 
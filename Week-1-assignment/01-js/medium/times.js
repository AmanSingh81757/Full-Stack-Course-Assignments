/*
Write a function that calculates the time (in seconds) it takes for the JS code to calculate sum from 1 to n, given n as the input.
Try running it for
1. Sum from 1-100
2. Sum from 1-100000
3. Sum from 1-1000000000
Hint - use Date class exposed in JS
*/

function calculateTime(n) {
    let start = new Date;
    console.log((n*(n+1))/2);
    let end = new Date;
    console.log((end-start)/1000);
}


calculateTime(100); //====> 0.004
calculateTime(100000); //====> 0.004
calculateTime(1000000000); //====> 0.747

let c = 0;
function counter(){
    c++;
    console.log(c);
    setTimeout(counter, 1000);
}

counter();
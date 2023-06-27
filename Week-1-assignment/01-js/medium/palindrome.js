/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.

  Once you've implemented the logic, test your code by running
  - `npm run test-palindrome`
*/

function removePunctuations(text) {
  // Remove punctuations using regular expressions and replace()
  var cleanedText = text.replace(/[^\w]|_/g, "");
  return cleanedText;
}

function isPalindrome(str) {
  let st = str.toLowerCase();
  let s = removePunctuations(st);
  let n = s.length;
  for(let i=0;i<n/2;i++){
    if(s[i]!=s[n-1-i]) return false;
  }
  return true;
}

module.exports = isPalindrome;

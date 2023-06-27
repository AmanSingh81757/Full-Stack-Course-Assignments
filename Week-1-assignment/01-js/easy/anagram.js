/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.

  Once you've implemented the logic, test your code by running
  - `npm run test-anagram`
*/

function isAnagram(str1, str2) {
  let s1 = str1.toLowerCase();
  let s2 = str2.toLowerCase();
  let st1 = s1.split('');
  let st2 = s2.split('');
  st1.sort();
  st2.sort();
  let sortedS1 = st1.join('');
  let sortedS2 = st2.join('');
  if(sortedS1 == sortedS2) return true;
  else return false;
}

module.exports = isAnagram;

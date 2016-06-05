'use strict';

// Pick a random key from an object

module.exports = function pickRandomProperty(obj) {
  var result;
  var count = 0;
  for(var prop in obj) {
    count += 1;
    if(Math.random() < (1 / count)) {
      result = prop;
    }
  }
  return result;
};

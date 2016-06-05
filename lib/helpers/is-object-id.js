'use strict';

var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");

module.exports = function isObjectId(id) {
  return id.length == 12 || (id.length == 24 && checkForHexRegExp.test(id));
};

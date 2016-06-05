'use strict';

module.exports.toJson = function() {
  return {
    id: this._id,
    username: this.username,
    email: this.email,
    creationDate: this.createtionDate
  };
};

module.exports.toPublicJson = function() {
  return {
    id: this._id,
    username: this.username,
    creationDate: this.createtionDate
  };
};

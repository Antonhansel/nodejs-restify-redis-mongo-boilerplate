'use strict';

module.exports.toJson = function() {
  return {
    id: this._id,
    username: this.username,
    email: this.email,
    serviceLogin: this.serviceLogin,
    creationDate: this.createtionDate,
    pictureUrl: this.pictureUrl,
    coverUrl: this.coverUrl,
    description: this.description
  };
};

module.exports.toPublicJson = function() {
  return {
    id: this._id,
    username: this.username,
    creationDate: this.createtionDate,
    pictureUrl: this.pictureUrl,
    coverUrl: this.coverUrl,
    description: this.description
  };
};

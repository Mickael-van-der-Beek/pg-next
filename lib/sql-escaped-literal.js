'use strict';

class SqlEscapedLiteral {
  constructor (parts) {
    this._parts = parts;
  }
  get text () {
    return this._parts;
  }
}

module.exports = SqlEscapedLiteral;

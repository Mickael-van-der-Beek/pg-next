'use strict';

const SqlEscapedLiteral = require('./sql-escaped-literal');

class SqlLiteral {
  constructor (parts, values) {
    this._parts = parts;
    this._values = values;
  }
  _getText (counter = 1) {
    return this
      ._parts
      .reduce(
        (sqlLiterals, sqlLiteral, i) => {
          const child = this._values[i - 1];

          if (child instanceof SqlLiteral) {
            sqlLiterals.push(child._getText(counter));
            counter += child.values.length;
          } else if (child instanceof SqlEscapedLiteral) {
            sqlLiterals.push(child.text);
          } else if (i > 0 && (i - 1) < this._values.length) {
            sqlLiterals.push(`$${counter}`);
            counter += 1;
          }

          sqlLiterals.push(sqlLiteral);

          return sqlLiterals;
        },
        []
      )
      .join('');
  }
  get text () {
    return this._getText();
  }
  get values () {
    return this
      ._values
      .filter(child => !(child instanceof SqlEscapedLiteral))
      .reduce(
        (values, child) => values.concat(
          child instanceof SqlLiteral
            ? child.values
            : [child]
        ),
        []
      );
  }
}

module.exports = SqlLiteral;

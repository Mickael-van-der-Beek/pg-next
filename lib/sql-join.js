'use strict';

const SqlLiteral = require('./sql-literal');

function sqlJoin (sqlLiterals, separator = ',') {
  return new SqlLiteral(
    [].concat(
      '',
      new Array(sqlLiterals.length - 1).fill(separator),
      ''
    ),
    sqlLiterals
  );
}

module.exports = {
  sqlJoin
};

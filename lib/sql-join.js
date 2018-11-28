'use strict';

const SqlLiteral = require('./sql-literal');

function sqlJoin (sqlLiterals, separator = ',') {
  return sqlLiterals.length > 0
    ? new SqlLiteral(
      [].concat(
        '',
        new Array(sqlLiterals.length - 1).fill(separator),
        ''
      ),
      sqlLiterals
    )
    : new SqlLiteral([], []);
}

module.exports = {
  sqlJoin
};

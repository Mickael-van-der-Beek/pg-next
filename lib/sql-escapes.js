'use strict';

const SqlEscapedLiteral = require('./sql-escaped-literal');

function sqlEscapeIdentifier (value) {
  return new SqlEscapedLiteral(`"${value.replace(/"/g, '""')}"`);
}

function sqlJoinEscapeIdentifier (values, separator = '_') {
  return sqlEscapeIdentifier(values.join(separator));
}

function sqlEscapeLiteral (value) {
  const escaped = value.toString().replace(/'/g, '\'\'').replace(/\\/g, '\\\\');
  const prefix = escaped.includes('\\') ? ' E' : '';
  return new SqlEscapedLiteral(`${prefix}'${escaped}'`);
}

module.exports = {
  sqlEscapeIdentifier,
  sqlJoinEscapeIdentifier,
  sqlEscapeLiteral
};

'use strict';

const SqlEscapedLiteral = require('./sql-escaped-literal');
const constants = require('./constants');

function sqlEscapeIdentifier (value) {
  const escapedIdentifier = `"${value.replace(/"/g, '""')}"`;

  if (Buffer.from(escapedIdentifier).length > constants.NAMEDATALEN - 1) {
    throw new Error(`Escaped identifier ${escapedIdentifier} is larger than max of ${constants.NAMEDATALEN - 1} bytes`);
  }

  return new SqlEscapedLiteral(escapedIdentifier);
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

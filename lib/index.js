'use strict';

const { sqlEscapeIdentifier, sqlJoinEscapeIdentifier, sqlEscapeLiteral } = require('./sql-escapes');
const { sqlJoin } = require('./sql-join');
const { sqlTemplateTag } = require('./sql-template-tag');
const SqlEscapedLiteral = require('./sql-escaped-literal');
const SqlLiteral = require('./sql-literal');

module.exports = {
  sqlEscapeIdentifier,
  sqlJoinEscapeIdentifier,
  sqlEscapeLiteral,
  sqlJoin,
  sqlTemplateTag,
  SqlEscapedLiteral,
  SqlLiteral
};

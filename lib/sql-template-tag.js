'use strict';

const SqlLiteral = require('./sql-literal');

function sqlTemplateTag (parts, ...values) {
  return new SqlLiteral(parts, values);
}

module.exports = {
  sqlTemplateTag
};

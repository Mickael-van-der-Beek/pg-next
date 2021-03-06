'use strict';

const assert = require('assert');
const { sqlJoin } = require('../lib/sql-join');
const { sqlTemplateTag: sql } = require('../lib/sql-template-tag');

describe('SQL join', () => {
  it('joins native literal data types', () => {
    const literal = sqlJoin([
      1,
      'hello',
      [1, 2, 3]
    ]);
    assert.strictEqual(literal.text, '$1,$2,$3');
    assert.deepEqual(literal.values, [1, 'hello', [1, 2, 3]]);
  });
  it('joins SQL literal instances', () => {
    const literal = sqlJoin(
      [
        sql`foo`,
        sql`bar ${123}`,
        sql`${456}`
      ],
      ' baz '
    );
    assert.strictEqual(literal.text, 'foo baz bar $1 baz $2');
    assert.deepEqual(literal.values, [123, 456]);
  });
  it('default separator is comma', () => {
    const literal = sqlJoin([
      sql`foo`,
      sql`bar`
    ]);
    assert.strictEqual(literal.text, 'foo,bar');
    assert.deepEqual(literal.values, []);
  });
  it('empty string on empty list', () => {
    const literal = sqlJoin([]);
    assert.strictEqual(literal.text, '');
    assert.deepEqual(literal.values, []);
  });
});

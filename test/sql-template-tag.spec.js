'use strict';

const assert = require('assert');
const { sqlTemplateTag: sql } = require('../lib/sql-template-tag');
const { sqlEscapeIdentifier, sqlEscapeLiteral } = require('../lib/sql-escapes');

describe('SQL template tag', () => {
  it('collects values and write placeholders', () => {
    var literal = sql`foo ${123} ${'abc'} bar ${null}`;
    assert.equal(literal.text, 'foo $1 $2 bar $3');
    assert.deepEqual(literal.values, [123, 'abc', null]);
  });
  it('accepts nested literals', () => {
    var literal = sql`foo ${sql`bar ${1} ${2} ${sql`baz`}`} ${sql`foobar ${3}`} ${4}`;
    assert.equal(literal.text, 'foo bar $1 $2 baz foobar $3 $4');
    assert.deepEqual(literal.values, [1, 2, 3, 4]);
  });
  it('does not interpolate arrays into values array', () => {
    var literal = sql`${[1, 2, 3]}`;
    assert.deepEqual(literal.values, [[1, 2, 3]]);
  });
  it('does not interpolate escaped identifiers or literals', () => {
    var literal = sql`foo ${sqlEscapeIdentifier('bar')} ${sqlEscapeLiteral('b\\az')} bat`;
    assert.equal(literal.text, 'foo "bar"  E\'b\\\\az\' bat');
    assert.deepEqual(literal.values, []);
  });
});

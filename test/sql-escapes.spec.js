'use strict';

const assert = require('assert');
const {
  sqlEscapeIdentifier,
  sqlJoinEscapeIdentifier,
  sqlEscapeLiteral
} = require('../lib/sql-escapes');
const constants = require('../lib/constants');

describe('SQL escapes', () => {
  describe('SQL escape identifier', () => {
    it('no special characters', () => {
      assert.strictEqual(sqlEscapeIdentifier('hello world').text, '"hello world"');
    });
    it('contains double quotes only', () => {
      assert.strictEqual(sqlEscapeIdentifier('hello " world').text, '"hello "" world"');
    });
    it('contains single quotes only', () => {
      assert.strictEqual(sqlEscapeIdentifier('hello \' world').text, '"hello \' world"');
    });
    it('contains backslashes only', () => {
      assert.strictEqual(sqlEscapeIdentifier('hello \\ world').text, '"hello \\ world"');
    });
    it('contains single quotes and double quotes', () => {
      assert.strictEqual(sqlEscapeIdentifier('hello \' " world').text, '"hello \' "" world"');
    });
    it('contains double quotes and backslashes', () => {
      assert.strictEqual(sqlEscapeIdentifier('hello \\ " world').text, '"hello \\ "" world"');
    });
    it('contains single quotes and backslashes', () => {
      assert.strictEqual(sqlEscapeIdentifier('hello \\ \' world').text, '"hello \\ \' world"');
    });
    it('contains single quotes, double quotes, and backslashes', () => {
      assert.strictEqual(sqlEscapeIdentifier('hello \\ \' " world').text, '"hello \\ \' "" world"');
    });
    it('throws if identifier longer that maximum allowed byte length', () => {
      assert.doesNotThrow(() => sqlEscapeIdentifier(new Array(constants.NAMEDATALEN - 2 - 1).fill('a').join('')), Error);
      assert.throws(() => sqlEscapeIdentifier(new Array(constants.NAMEDATALEN - 2).fill('a').join('')), Error);
      assert.throws(() => sqlEscapeIdentifier(new Array(constants.NAMEDATALEN - 2 + 1).fill('a').join('')), Error);
    });
  });
  describe('SQL join escape identifier', () => {
    it('join values together with separator and escape the result', () => {
      assert.strictEqual(sqlJoinEscapeIdentifier(['hello', '"', 'world'], '_').text, '"hello_""_world"');
    });
  });
  describe('SQL escape literal', () => {
    it('no special characters', () => {
      assert.strictEqual(sqlEscapeLiteral('hello world').text, '\'hello world\'');
    });
    it('contains double quotes only', () => {
      assert.strictEqual(sqlEscapeLiteral('hello " world').text, '\'hello " world\'');
    });
    it('contains single quotes only', () => {
      assert.strictEqual(sqlEscapeLiteral('hello \' world').text, '\'hello \'\' world\'');
    });
    it('contains backslashes only', () => {
      assert.strictEqual(sqlEscapeLiteral('hello \\ world').text, ' E\'hello \\\\ world\'');
    });
    it('contains single quotes and double quotes', () => {
      assert.strictEqual(sqlEscapeLiteral('hello \' " world').text, '\'hello \'\' " world\'');
    });
    it('contains double quotes and backslashes', () => {
      assert.strictEqual(sqlEscapeLiteral('hello \\ " world').text, ' E\'hello \\\\ " world\'');
    });
    it('contains single quotes and backslashes', () => {
      assert.strictEqual(sqlEscapeLiteral('hello \\ \' world').text, ' E\'hello \\\\ \'\' world\'');
    });
    it('contains single quotes, double quotes, and backslashes', () => {
      assert.strictEqual(sqlEscapeLiteral('hello \\ \' " world').text, ' E\'hello \\\\ \'\' " world\'');
    });
  });
});

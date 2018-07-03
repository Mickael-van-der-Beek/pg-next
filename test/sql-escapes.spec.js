'use strict';

const assert = require('assert');
const { sqlEscapeIdentifier, sqlEscapeLiteral } = require('../lib/sql-escapes');

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

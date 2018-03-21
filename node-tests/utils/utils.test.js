const utils = require('./utils');
const assert = require('assert');

it('should add two numbers', () => {
    assert.equal(utils.add(33, 11), 44);
});

it('should multiple number', () => {
    assert.equal(utils.square(9), 81);
});
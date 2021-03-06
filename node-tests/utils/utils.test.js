const utils = require('./utils');
// const assert = require('assert');
const expect = require('expect');

describe('Utils', () => {

    // describe('#add', () => {
    it('should add two numbers', () => {
        // assert.equal(utils.add(33, 11), 44);
        expect(utils.add(33, 11)).toBe(44).toBeA('number');
    });

    it('it should async add two numbers', done => {
        utils.asyncAdd(33, 11, (summ) => {
            expect(summ).toBe(44).toBeA('number');
            done();
        });
    });
    // });

    it('should multiple number', () => {
        expect(utils.square(9)).toBe(81).toBeA('number');
    });

    it('should async multiple number', done => {
        utils.asyncSquare(9, (summ) => {
            expect(summ).toBe(81).toBeA('number');
            done();
        });
    });

    it('should expect some values', () => {
        expect(utils.add(33, 11)).toBeMoreThan(43);
        expect(utils.add(33, 11)).toNotBe(45);
        expect({ name: 'Alexandr' }).toEqual({ name: 'Alexandr' });
        expect([2, 3, 4]).toInclude(2);
        expect([2, 3, 4]).toExclude(5);
        expect({
            name: 'Alexandr',
            age: 27,
            location: 'Philadelphia'
        }).toInclude({ age: 27 });
        expect({
            name: 'Alexandr',
            age: 27,
            location: 'Philadelphia'
        }).toExclude({ age: 25 });
    });
});

it('should expect correct first and last names', () => {
    const user = { firstName: 'Nikolay', lastName: 'Velikii' };
    utils.setName(user, 'Alexandr Ketov');
    expect(user).toExclude({ firstName: 'Nikolay' });
    expect(user).toInclude({ firstName: 'Alexandr', lastName: 'Ketov' });
    expect(user).toExclude({ lastName: 'Velikii' });
});
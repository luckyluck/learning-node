const expect = require('expect');
const rewire = require('rewire');

const app = rewire('./app');

describe('App', () => {
    const db = {
        saveUser: expect.createSpy()
    };
    app.__set__('db', db);

    it('should call the spy correctly', () => {
        const spy = expect.createSpy();
        spy('Alexandr', 27);
        expect(spy).toHaveBeenCalledWith('Alexandr', 27);
    });

    it('should call saveUser with user object', () => {
        const email = 'alex@test.com';
        const password = 'qwerty';

        app.handleSignUp(email, password);
        expect(db.saveUser).toHaveBeenCalledWith({ email, password });
    });

});
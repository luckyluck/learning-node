const add = (a, b) => a + b;

const asyncAdd = (a, b, callback) => {
    setTimeout(() => {
        callback(a + b);
    }, 1000);
};

const square = a => a * a;

const asyncSquare = (a, callback) => {
    setTimeout(() => {
        callback(a * a);
    }, 1000);
};

const setName = (user, fullName) => {
    const nameAsArray = fullName.split(' ');
    user.firstName = nameAsArray[0];
    user.lastName = nameAsArray[1];
};

module.exports = {
    add,
    asyncAdd,
    square,
    asyncSquare,
    setName
};
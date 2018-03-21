const add = (a, b) => a + b;
const square = a => a * a;

const setName = (user, fullName) => {
    const nameAsArray = fullName.split(' ');
    user.firstName = nameAsArray[0];
    user.lastName = nameAsArray[1];
};

module.exports = {
    add,
    square,
    setName
};
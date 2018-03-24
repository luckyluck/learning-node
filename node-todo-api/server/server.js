const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

const Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

const User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
});

// const newTodo = new Todo({
//     text: '  Edit this video   '
// });

// newTodo.save().then(doc => {
//     console.log('Saved todo: ', JSON.stringify(doc, null, 2));
// }, error => {
//     console.log('Unable to save todo: ', error);
// });

// const newUser = new User({
//     email: ''
// });

// newUser.save().then(user => {
//     console.log('Saved user: ', JSON.stringify(user, null, 2));
// }, error => {
//     console.log('Unable to save user: ', error);
// });
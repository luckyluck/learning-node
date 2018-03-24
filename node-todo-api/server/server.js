const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

const Todo = mongoose.model('Todo', {
    text: {
        type: String
    },
    completed: {
        type: Boolean
    },
    completedAt: {
        type: Number
    }
});

const newTodo = new Todo({
    text: 'Feed the cat',
    completed: true,
    completedAt: new Date().getTime()
});

newTodo.save().then(doc => {
    console.log('Saved todo: ', JSON.stringify(doc, null, 2));
}, error => {
    console.log('Unable to save todo: ', error);
});
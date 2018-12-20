const express = require('express');
const expressGraphql = require('express-graphql');
const { buildSchema } = require('graphql');
const schema = require('./schema')

const server = express();

const todos = [];

var root = {
  ping: () => {
    return 'I am Alive!';
  },
  todos: () => {
    return todos;
  },
  todo: function (args) {
    return todos.find((todo) => (todo.id == args.id));
  },
  createTodo: (args) => {
    const newTodo = Object.assign({}, args.todo);
    newTodo.id = todos.length + 1;
    todos.push(newTodo);
    return newTodo;
  },
  editTodo: (args) => {
    const todo = todos.find((todo) => (todo.id == args.id));
    Object.assign(todo, args.todo);
    return todo;
  },
  deleteTodo: (args) => {
    const todoIndex = todos.findIndex((todo) => (todo.id == args.id));    
    if (todoIndex >= 0 ){
      todos.splice(todoIndex, 1);
      return true;
    } 
    return false;
  }
};

server.use('/graphql', expressGraphql({
  schema: buildSchema(schema),
  rootValue: root,
  graphiql: true,
}));

const port = 7777;

server.listen(port, () => {
  console.log(`App started on port ${port}`);
});

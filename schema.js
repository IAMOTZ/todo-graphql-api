module.exports = `
type Query {
  ping: String
  todos: [Todo!]!
  todo(id: ID!): Todo
}

type Mutation {
  createTodo(todo: CreateTodoInput!): Todo!
  editTodo(id: ID!, todo: EditTodoInput!): Todo
  deleteTodo(id: ID!): Boolean!
  categoriseTodo(id: ID!, category: TodoCategory!): Todo
}

type Todo {
  id: ID!
  title: String!
  body: String!
  done: Boolean!
  category: TodoCategory!
}

enum TodoCategory {
  WORK
  FAMILY
  PRIVATE
}

input CreateTodoInput {
  title: String!
  body: String!
  done: Boolean=false
  category: TodoCategory=PRIVATE
}

input EditTodoInput {
  title: String
  body: String
}
`
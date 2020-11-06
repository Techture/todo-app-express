import React, { Component } from "react";
import axios from "axios";
import Todo from "./Todo";
import CreateTodo from "./CreateTodo";

export default class Todos extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
    };

    this.addToDo = this.addToDo.bind(this);
    this.removeToDo = this.removeToDo.bind(this);
  }

  async componentDidMount() {
    const res = await axios.get("/api/todos");
    this.setState({ todos: res.data });
  }

  addToDo(todo) {
    const { data } = todo;
    // console.log("DATA >>", data);

    const newTodo = {
      taskName: data.taskName,
      assignee: data.assignee,
    };

    this.setState({ todos: [...this.state.todos, newTodo] });
    // console.log("TODO >>", todo);
  }

  async removeToDo(todoId) {
    this.setState({
      todos: this.state.todos.filter((todo) => todo.id !== todoId),
    });
    await axios.delete(`/api/todos/${todoId}`);
  }

  render() {
    return (
      <div id="todos">
        <CreateTodo addToDo={this.addToDo} />
        {this.state.todos.map((todo, i) => (
          <Todo todo={todo} key={i} removeToDo={this.removeToDo} />
        ))}
      </div>
    );
  }
}

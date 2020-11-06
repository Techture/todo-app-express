import React, { Component } from "react";
import axios from "axios";
import TodoForm from "./TodoForm";

export default class CreateTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskName: "",
      assignee: "",
    };
  }

  //use arrow functions so we dont need to bind
  handleChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    //Post data to our database
    const res = await axios.post("/api/todos", {
      taskName: event.target.taskName.value,
      assignee: event.target.assignee.value,
    });

    this.setState({
      taskName: "",
      assignee: "",
    });

    this.props.addToDo(res);
  };

  render() {
    return (
      <div>
        <TodoForm
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
      </div>
    );
  }
}

import React from "react";

export default function TodoForm(props) {
  console.log("TODOFORM Props >>", props);
  return (
    <form onSubmit={props.handleSubmit}>
      <label>Task Name</label>
      <input
        type="text"
        name="taskName"
        value={props.taskName}
        onChange={props.handleChange}
      />

      <label>Assignee</label>
      <input
        type="text"
        name="assignee"
        value={props.assignee}
        onChange={props.handleChange}
      />

      <button type="submit">submit</button>
    </form>
  );
}

import { Fragment } from "react";
import TodoList from "./TodoList"


const TodolistCheck = ({ tasks, toggleCheck, deleteTask }) => {

  return (
    <>
      {tasks.map((task) => {
        return (
          <Fragment key={task._id}>
            <TodoList 
              task={task} 
              toggleCheck={toggleCheck}
              deleteTask={deleteTask}
            />
          </Fragment>
        );
      })}
    </>
  );
};

export default TodolistCheck;

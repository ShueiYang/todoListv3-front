import { FaTrash } from "react-icons/fa";


const TodoList = ({task, toggleCheck, deleteTask }) => {

  return (
    <div className="flex justify-between mx-8 my-4 text-xl gap-3">
      <label className="flex gap-3">
        <input type="checkbox" 
          checked={task.done}
          onChange={()=> {toggleCheck(task)}}
        />
        <p className={`${task.done ? "line-through" : "" }`}>
          {task.title}
        </p> 
      </label>
      <div className="flex items-center">
        <FaTrash 
          className="text-lg text-[#7277da] dark:text-pink-600 hover:cursor-pointer"
          onClick={()=>{deleteTask(task)}}
        />
      </div>
    </div>
  )
}

export default TodoList;
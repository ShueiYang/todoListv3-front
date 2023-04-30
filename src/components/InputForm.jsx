import { useState } from "react"


const InputForm = ({addTask, error}) => {

  const [input, setInput] = useState("")

  return (
    <div className="flex flex-col items-center sm:w-[80%] mt-4 mx-auto">
      <div className="flex flex-col sm:flex-row items-center">
        <input 
            className="mx-8 w-72 text-slate-900 bg-[#e7f2ff] dark:bg-[#fcf4f8]"
            type="text" 
            onChange={(e)=> {
              setInput(e.target.value)
            }}
            placeholder="new task"
            value={input}
        />
        <button 
          className="text-slate-50 bg-[#7277da] dark:bg-pink-600 hover:bg-[#4c509a] dark:hover:bg-pink-500 mt-4 sm:mt-0"
          onClick={()=> {addTask(input); setInput("")}}
        >
            Add Task
        </button>
      </div>
      <span className="my-4 text-red-500">{error && error.message}</span>
    </div>
  )
}

export default InputForm;
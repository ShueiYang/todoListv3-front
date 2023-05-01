import axios from 'axios';


function useTodolist(
    setUnCheckTasks, 
    setCheckTasks, 
    setError,
    unCheckTasks,
    checkTasks    
) {
    async function addTask(event, taskTitle) {
        event.preventDefault();
      // reset error message under input
        setError(null)
        try {
          const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/add`, {
            title: taskTitle
          })
          // if response ok update the local state
          if(response.status === 201) {
            const newTask = response.data.task
            setUnCheckTasks(prevList => {
              return [...prevList, newTask]
            })
          }         
        } catch (err) {
            // use custom error if input is empty
            if(err.code === "ERR_BAD_REQUEST") {
                setError(err.response.data)
            } else {
              console.error(err)
              setError(err) 
            }     
        }
      }

      async function deleteTask(task) {
        try {
          const id = task._id
          const response = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/delete/${id}`)
          // if database is updated will filter the target array depending the task status, 
          // to display on the update array with the task deleted.
          if(response.status === 200) {
            if(!task.done) {
              setUnCheckTasks(prevList => {
                return prevList.filter(task => task._id !== id)
              })
            } else {
              setCheckTasks(prevList => {
                return prevList.filter(task => task._id !== id)
              })
            }
          } 
        } catch (err) {
          console.error(err)
          setError(err)
        }
      }

      async function toggleCheck(task) {  
        try {
          const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}/update`, {
            id: task._id,
            status: task.done
          })
          if(response.status === 200) {
          // if database is updated will filter out one array and add one to another depending the toggle check state.
            if(!task.done) {
              task.done = true
              const newFilter = unCheckTasks.filter(task => !task.done)
              setUnCheckTasks([... newFilter])
              setCheckTasks([...checkTasks, task])
            } else {
              task.done = false
              const newFilter = checkTasks.filter(task => task.done)
              setCheckTasks([... newFilter])
              setUnCheckTasks([...unCheckTasks, task])
            }
          }    
        } catch (err) {
          console.err(err)
          setError(err)
        }
      }   
      return {
        addTask,
        deleteTask,
        toggleCheck
      }
}

export default useTodolist;
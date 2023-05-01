import './App.css'
import Header from './components/Header';
import TodolistCheck from './components/TodolistCheck';
import InputForm from './components/InputForm';
import Footer from './components/Footer';
import axios from 'axios';
import { useState, useEffect } from 'react'
import useTodolist from './hooks/useTodoList';


function App() {

  const [unCheckTasks, setUnCheckTasks] = useState([]);
  const [checkTasks, setCheckTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // this hooks to trigger this function to fetch data when the component mount.
  useEffect(() => {
  // adding abort controller to cancel request just in case
    const controller = new AbortController();
    const { signal } = controller;

    const getToDoList = async () => {
    // enable loading state
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/`, {signal})
        if(response.status === 200) {
          const datas = response.data;
    // if data fetching is successful then proceeding to separate uncheck and check tasks
          const incompletedTasks = [];
          const completedTasks = [];
          datas.forEach((task) => {
            if (task.done) {
              completedTasks.push(task);
            } else {
              incompletedTasks.push(task);
            }
          });
          setCheckTasks(completedTasks);
          setUnCheckTasks(incompletedTasks)
        }
      } catch (err) {     
        // to avoid error from cancelling request from react strict Mode.
        if(err.name === "CanceledError") {
          console.log("Request cancelled!")
        } else {
          console.error(err)
          setError(err)
        }   
      } finally {
        setLoading(false);
      }
    }
    getToDoList();

    return ()=> {
      controller.abort();
    }
  }, []); 
  //empty dependency to trigger this function only ONCE when component mount


  // custom hooks for todolist
  const { addTask, deleteTask, toggleCheck } = useTodolist(  
    setUnCheckTasks, 
    setCheckTasks,
    setError,
    unCheckTasks,
    checkTasks
  );
  

  return (
    <div className="container flex flex-col items-center">
      <Header />

      <main className="flex flex-col grow justify-center px-2 mt-6">    
       { loading ? 
          <div className="text-center text-xl font-medium">
            <h2>Loading ...</h2>
          </div>
        : <>
            <TodolistCheck 
              tasks={unCheckTasks} 
              toggleCheck={toggleCheck}
              deleteTask={deleteTask} 
            />
            <TodolistCheck 
              tasks={checkTasks}  
              toggleCheck={toggleCheck}
              deleteTask={deleteTask} 
            />    
          </>
       } 
        <InputForm addTask={addTask} error={error}/>
      </main>
      <Footer/>
    </div>
  )
}

export default App;

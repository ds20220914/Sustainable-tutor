import { useState } from 'react'
import { Routes, Route, } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Togglable from './components/Togglable';
import TaskForm from './components/task';
import { createTask } from './taskReducer';

const App=()=> {

  const [newTasks, setNewTasks] = useState({ topic:"", currentlevel:"", targetlevel:"", description:""});
  const allTask = useSelector((state) => state.task.task);
  const dispatch = useDispatch();

  const addTask = async (event) => {
    event.preventDefault();
    
      const taskObject = {
        name: newTasks.topic,
        currentlevel: newTasks.level,
        targetlevel: newTasks.targetlevel,
        description: newTasks.description,
      };

      dispatch(createTask(taskObject));
      
      setNewTasks({ topic: "", currentlevel: "", targetlevel: "", description: "" });
      console.log(newTasks);
    } 
  ;

  const handleTaskChange = (event) => {
    setNewTasks({ ...newTasks, [event.target.name]: event.target.value });
  };
  
  const TaskList = () => (
    <div>
      <Togglable buttonLabel="new Task">
        <TaskForm
          addTask={addTask}
          newTasks={newTasks}
          handleTaskChange={handleTaskChange}
        />
      </Togglable>

    </div>
  );

  return (
    <div>
      <h1>MOI</h1>
      <Routes> 
        
        <Route path="/" element={TaskList()} /> 
      
      </Routes>
      <h2>{allTask ? allTask.name : "No tasks available"}</h2>
    </div>
  )
}

export default App

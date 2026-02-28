import { useState } from 'react'
import { Routes, Route, } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Togglable from './components/Togglable';
import TaskForm from './components/task';
import { createTask } from './taskReducer';

const App=()=> {

  const [newTasks, setNewTasks] = useState({ name:"", level:"", description:""});
  const allTask = useSelector((state) => state.task.task);
  const dispatch = useDispatch();

  const addTask = async (event) => {
    event.preventDefault();

    try {
      const taskObject = {
        name: newTasks.name,
        level: newTasks.level,
        description: newTasks.description,
      };

      dispatch(createTask(taskObject));
      note(`A new task "${taskObject.name}" added`);
      setNewTasks({ name: '', level: '', description: '' });
    } catch (error) {
      note('error adding task');
    }
  };

  const handleTaskChange = (event) => {
    setNewTasks({ ...newTasks, [event.target.name]: event.target.value });
  };
  
  const TaskList = () => (
    <div>
      <Togglable buttonLabel="new Task">
        <TaskForm
          addTask={addTask}
          newTask={newTasks}
          handleTaskChange={handleTaskChange}
        />
      </Togglable>

      <h2>{allTask ? allTask.name : "No tasks available"}</h2>
    </div>
  );

  return (
    <div>
      <h1>MOI</h1>
      <Routes> 
        
        <Route path="/" element={TaskList()} /> 
      
      </Routes>
    </div>
  )
}

export default App

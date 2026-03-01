import { useState } from 'react'
import { Routes, Route, } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Togglable from './components/Togglable';
import TaskForm from './components/task';
import { createTask, generateMaterials } from './taskReducer';
import HomePage from './components/homepage';

const App=()=> {

  const [newTasks, setNewTasks] = useState({ topic:"", currentlevel:"", targetlevel:"", description:"", preferred:"", count:5});
  const allTask = useSelector((state) => state.task.task);
  const generated = useSelector((state) => state.task.generated);
  const dispatch = useDispatch();

  const addTask = async (event) => {
    event.preventDefault();
    
      const taskObject = {
        name: newTasks.topic,
        currentlevel: newTasks.currentlevel,
        targetlevel: newTasks.targetlevel,
        description: newTasks.description,
      };

      dispatch(createTask(taskObject));
      dispatch(generateMaterials({
        topic: newTasks.topic,
        currentlevel: newTasks.currentlevel,
        targetlevel: newTasks.targetlevel,
        preferred: newTasks.preferred || 'multiple_choice',
        count: Number(newTasks.count) || 5,
        description: newTasks.description,
      }));
      
      setNewTasks({ topic: "", currentlevel: "", targetlevel: "", description: "", preferred:"", count:5 });
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
      <h1>Welcome to the Sustainable-tutor</h1>
      <HomePage />
      <Routes> 
        
        <Route path="/" element={TaskList()} /> 
      
      </Routes>
      <h2>{allTask ? allTask.name : "No tasks available"}</h2>
      {generated && (
        <div style={{ marginTop: '16px' }}>
          <h3>Generated Materials ({generated.preferred})</h3>
          <ul>
            {generated.items.map((it, idx) => (
              <li key={idx} style={{ marginBottom: '8px' }}>
                <div><strong>Q{idx+1}:</strong> {it.question}</div>
                {it.answer && (<div><em>Answer:</em> {it.answer}</div>)}
              </li>
            ))}
          </ul>
          <button onClick={() => dispatch(generateMaterials({
            topic: allTask ? allTask.name : newTasks.topic,
            currentlevel: newTasks.currentlevel || 'Remembering',
            targetlevel: newTasks.targetlevel || 'Understanding',
            preferred: newTasks.preferred || 'multiple_choice',
            count: Number(newTasks.count) || 5,
            description: newTasks.description,
          }))}>Regenerate</button>
        </div>
      )}
    </div>
  )
}

export default App

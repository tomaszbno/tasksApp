import { useEffect, useState } from 'react'
import './App.css'


function App() {
  const [tasks, setTasks] = useState([{
    id: 1,
    text: 'Learning React',
    done: false
  }]);
  const [taskToAdd, setTaskToAdd] = useState("");

  const updateTasks = (taskToAdd) => {
    if (taskToAdd.trim() !== "") {
      const newTasks = [...tasks]
      newTasks.push({
        id: newTasks.length + 1,
        text: taskToAdd,
        done: false
      });
      setTasks(newTasks);
      setTaskToAdd("");
    }
  }

// La parte de fuera

  return (
    <div>
      <input
        type="text"
        value={taskToAdd}
        placeholder="Add a new task"
        onChange={e => setTaskToAdd(e.target.value)}/>
      <button
        onClick={() => updateTasks(taskToAdd)}>
        Add Task
      </button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task.text}</li>
        ))}
      </ul>
    </div>
  )
}

export default App

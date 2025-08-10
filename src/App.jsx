import { useState } from 'react'
import './App.css'


function App() {
  // Estado para las tareas
  const [tasks, setTasks] = useState([{
    id: 1,
    text: 'Learning React',
    done: false
  }]);

  //Estado para el input
  const [taskToAdd, setTaskToAdd] = useState("");

  //Updatea la lista de tareas
  const updateTasks = (taskToAdd) => {
    if (taskToAdd.trim() !== "") { //chequea que la tarea no esté vacía
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
  //Marca como completa o incompleta
  const toggleDone = (id) => {
    const newTasks = [...tasks]
    newTasks.find(task => task.id === id).done = !newTasks.find(task => task.id === id).done
    setTasks(newTasks);
    console.log(newTasks.find(task => task.id === id).done)
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
        {tasks.map(task => (
          <><li key= { task.id} className="taskItem">
            <button className="taskBtn" onClick={() => toggleDone(task.id)}></button>
            {task.done ? <s>{task.text}</s> : <span>{task.text}</span>}
            </li>
          </>
        ))}
      </ul>
    </div>
  )
}

export default App

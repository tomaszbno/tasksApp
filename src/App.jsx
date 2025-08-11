import { useState , useEffect } from 'react'
import { nanoid } from 'nanoid'
import './App.css'


function App() {
  // Estado para las tareas
  const [tasks, setTasks] = useState([{
    id: nanoid(),
    text: 'Learning React',
    done: false
  }]);
  //muestra el array task cada vez que se actualiza (por consola)
  useEffect(() => {
    console.log(tasks);
  }, [tasks]);
  
  const counter = () => {
    if(tasks.length >= 1){
      return `Completed tasks: ${tasks.filter(task => task.done).length} / ${tasks.length}`
    }else return "No hay tareas 😊"
  }
  //Estado para el input
  const [taskToAdd, setTaskToAdd] = useState("");

  //Updatea la lista de tareas
  const updateTasks = (taskToAdd) => {
    if (taskToAdd.trim() === "") return //chequea que la tarea no esté vacía
    setTasks(prevTasks => [
      ...prevTasks,
      {
        id: nanoid(),
        text: taskToAdd.trim(),
        done: false
      }
    ])
    setTaskToAdd("");
  }
  //Marca como completa o incompleta
  const toggleDone = (id) => {
    setTasks(prevTasks => prevTasks.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    ));
  };
  //Funcion para eliminar una tarea
  const deleteTask = (id) => {
    setTasks( prevTasks => prevTasks.filter(task => task.id !== id ))
  }

// La parte de fuera

  return (
    <div className= "appContainer">
      <small>{counter()}</small>
      <div className="inputRow">
        <input
          type="text"
          value={taskToAdd}
          placeholder="Add a new task"
          onChange={e => setTaskToAdd(e.target.value)}/>
        <button
          onClick={() => updateTasks(taskToAdd)}>
          Add Task
        </button>
      </div>
      <ul>
        {tasks.map(task => (
          <li key={task.id} className="taskItem">
              <button className="taskBtn" onClick={() => toggleDone(task.id)}></button>
              {task.done ? <s>{task.text}</s> : <span>{task.text}</span>}
              <button className="delTask" onClick={() => deleteTask(task.id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App

import { useState , useEffect, use } from 'react'
import { nanoid } from 'nanoid'
import './App.css'


function App() {
  // Estado para las tareas
  const [tasks, setTasks] = useState(() => {
    const saved= localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [{
      id: nanoid(),
      text: 'Learning React',
      done: false
    }];
  });
  //estado para el filtrado
  const [filter, setFilter] = useState("all");
  //estado para la edicion
  const [editingId, setEditingId] = useState(null);
  //Estado para el input
  const [taskToAdd, setTaskToAdd] = useState("");
  //estado para el input de la edicion
  const[taskToEdit, setTaskToEdit] = useState("");

  //muestra el array task cada vez que se actualiza (por consola)
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    console.log(tasks);
  }, [tasks]);
  
  const counter = () => {
    return tasks.length > 0 ? `Completed tasks: ${tasks.filter(task => task.done).length} / ${tasks.length}` : "No hay tareas 😊"
  }

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

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case "all":
        return true;
      case "completed":
        return task.done;
      case "pending":
        return !task.done;
      default:
        return true;
    }
  });

  //edita la tarea
  const editTask = (id, newText) => {
    newText.trim() !== "" ? setTasks(prevTasks => prevTasks.map(task =>
      task.id === id ? { ...task, text: newText } : task
    )) : setTaskToEdit("")
    setTaskToEdit(""); // Limpia el input de edición
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
      <div className="filters">
        <small>filters:</small>
        <small>All</small>
        <button onClick={() => setFilter("all") } disabled={filter === 'all'}></button>
        <small>Completed</small>
        <button onClick={() => setFilter("completed") } disabled={filter === 'completed'}></button>
        <small>Pending</small>
        <button onClick={() => setFilter("pending") } disabled={filter === 'pending'}></button>
      </div>
      <ul>
        {filteredTasks.map(task => (
          <li key={task.id} className="taskItem">
            <button className="taskBtn" onClick={() => toggleDone(task.id)}></button>
            {editingId === task.id ? (
              //abre el editor de tarea
              <>
                <input
                  type="text"
                  value={taskToEdit}
                  onChange={e => setTaskToEdit(e.target.value)}
                />
                <button className= "saveTask"onClick={() => {
                  editTask(task.id, taskToEdit);
                  setEditingId(null);
                }}>Save</button>
                <button className="cancelEditTask" onClick={() => setEditingId(null)}>cancel</button>
              </>
              //cierra el editor de tarea
            ) : (
              <>
                {task.done ? <s>{task.text}</s> : <span>{task.text}</span>}
                <button className="delTask" onClick={() => deleteTask(task.id)}>delete</button>
                <button className="editTask" onClick={() => {
                  setEditingId(task.id);
                  setTaskToEdit(task.text);
                }}>edit</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App

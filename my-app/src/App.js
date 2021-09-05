import {useState, useEffect} from 'react'
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import './App.css';

function App() {

  const [showAddTask, setShowAddTask] = useState(false) // sets states of the components
  const [tasks, setTasks] = useState([])


  // Use Effect- grabbing api data 
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  // Fetch Task
  const fetchTasks = async(id) => {
    const res = await fetch(`http://localhost:5000/tasks/`) // grabbing api json data
    const data = await res.json()
    return data
  }

    // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }
  

  // Add Tasks
  const addTask = async  (task) => {
  //   const id = Math.floor(Math.random() * 10000) + 1 // this gets a random id number 
  //   const newTask = {id, ...task}
  //   setTasks([...tasks,newTask])
    
    const res = await fetch('http://localhost:5000/tasks',{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(task)
    })

    const data =  await res.json()

    setTasks([...tasks,data])

  }


  // Delete Tasks function 
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method:'DELETE'
    })
    setTasks(tasks.filter((task) => task.id !== id)) //taking the tasks that are present, for each task that is not equal to the id will be removed
    console.log('delete task', id);
  }

  // Toggle Reminder fucntion 
  const toggleReminder = async (id) =>{
    const taskToToggle = await fetchTask(id)
    const updTask = {...taskToToggle,
    reminder: !taskToToggle.reminder}
    
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type':'application/json'
      },
      body:JSON.stringify(updTask)
    })

    const data =  await res.json()

    setTasks(
      tasks.map((task) => //checks if set reimnder is true or false 
         task.id === id ? {...task, reminder:
         data.reminder} : task 
        )
    )
  }
  //Rendering Components to virtual DOM, if show add task is true then show the add task user input. 
  return (
    <div className="container">
      <Header 
        onAdd={() => setShowAddTask(!showAddTask)} 
        showAdd={showAddTask}
      /> 
      {showAddTask && <AddTask onAdd={addTask} />} 
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'No Tasks Available'} 
    </div>
  );
}

export default App;

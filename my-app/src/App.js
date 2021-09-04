import {useState} from 'react'
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import './App.css';

function App() {

  const [showAddTask, setShowAddTask] = useState(false) // sets states of the components
  const [tasks, setTasks] = useState([])

  // Add Tasks
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1 // this gets a random id number 
    const newTask = {id, ...task}
    setTasks([...tasks,newTask])
  }


  // Delete Tasks function 
  const deleteTask = (id) => {
    console.log('delete task', id);
    setTasks(tasks.filter((task) => task.id !== id)) //taking the tasks that are present, for each task that is not equal to the id will be removed
  }

  // Toggle Reminder fucntion 
  const toggleReminder = (id) =>{
    setTasks(
      tasks.map((task) => //checks if set reimnder is true or false 
         task.id === id ? {...task, reminder:
         !task.reminder} : task 
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

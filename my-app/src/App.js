import {useState} from 'react'
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([
    {
        id:1,
        text:'Doctors Appointment',
        day: 'Feb 5th at 2:30pm',
        reminder:true,
    },
    {
        id:2,
        text:'Meeting at School',
        day: 'Feb 6th at 1:30pm',
        reminder:true,
    },
    {
        id:3,
        text:'Shopping',
        day: 'Feb 7th at 2:30pm',
        reminder:true,
    }
  ])

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
  //Rendering Components to virtual DOM
  return (
    <div className="container">
      <Header/>
      <AddTask onAdd={addTask} />
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'No Tasks Available'} 
    </div>
  );
}

export default App;

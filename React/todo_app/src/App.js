import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


const TaskList = ({ tasks, onDelete, onToggle, onComplete }) => {
  return (
    <Droppable droppableId="tasks" type="task">  
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="space-y-4" 
        >
          {tasks.map((task, index) => (
            <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className={`p-4 border rounded ${snapshot.isDragging ? 'bg-gray-200' : task.completed ? 'bg-green-100' : 'bg-white'}`}
                >
                  <div className="font-bold">
                    {task.name} - Added on {task.dateAdded}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onDelete(task.id)}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                    {!task.completed && (
                      <button
                        onClick={() => onComplete(task.id)}
                        className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Complete
                      </button>
                    )}
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => onToggle(task.id)}
                      className="form-checkbox text-green-500 h-5 w-5"
                    />
                  </div>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};


const App = () => {
  const [tasks, setTasks] = useState([]); // [1] Tasks state , which hold all the tasks
  const [newTask, setNewTask] = useState(''); // [2] newTask state , which hold the value of the new task input

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []); // [3] useEffect to load the tasks from localStorage

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);// [4] useEffect to save the tasks to localStorage

  const addTask = () => {
    if (newTask.trim() === '') return;
    const newTaskObject = {
      id: new Date().getTime(),
      name: newTask,
      dateAdded: new Date().toLocaleDateString(),
      completed: false,
    };
    setTasks([...tasks, newTaskObject]);
    setNewTask('');
  };// [5] addTask function to add new task to the tasks state

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };// [6] deleteTask function to delete a task from the tasks state

  const toggleCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };//[7] toggleCompletion function to toggle the completed property of a task

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedTasks = Array.from(tasks);
    const [movedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedTask);

    setTasks(reorderedTasks);
  };// [8] onDragEnd function to reorder the tasks

  const completeTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: true } : task
      )
    );
  };// [9] completeTask function to complete a task

  return (
    <div className="max-w-screen-md mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Task Tracker</h1>
      <input
        type="text"
        placeholder="Add new task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <button
        onClick={addTask}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Add Task
      </button>
      <DragDropContext onDragEnd={onDragEnd}>
        <TaskList
          tasks={tasks}
          onDelete={deleteTask}
          onToggle={toggleCompletion}
          onComplete={completeTask}
        />
      </DragDropContext>
    </div>
  );
};

export default App;
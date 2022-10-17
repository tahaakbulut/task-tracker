import React, { useContext } from 'react';
import { v4 as uuidV4 } from 'uuid';
import useLocalStorage from '../hooks/use-local-storage';
const TasksContext = React.createContext();

export const useTasks = () => useContext(TasksContext);

export const PRIORITIES = {
  Urgent: {
    id: 1,
    color: 'red',
  },
  Regular: {
    id: 2,
    color: 'yellow',
  },
  Trival: {
    id: 3,
    color: 'blue',
  },
};

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useLocalStorage('tasks', []);

  const getTask = (taskId) => {
    return tasks.filter((task) => task.id === taskId);
  };

  const addTask = ({ name, priority }) => {
    setTasks((prevTasks) => {
      if (prevTasks.find((task) => task.name === name)) return prevTasks;
      return [...prevTasks, { id: uuidV4(), name, priority }];
    });
  };

  const editTask = ({ taskId, priority }) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id == taskId) task.priority = priority;
        return task;
      });
    });
  };

  const deleTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <TasksContext.Provider
      value={{ tasks, getTask, addTask, editTask, deleTask }}
    >
      {children}
    </TasksContext.Provider>
  );
};

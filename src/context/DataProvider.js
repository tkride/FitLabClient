import React, { createContext, useState } from 'react';
import { customAlphabet } from 'nanoid/non-secure'

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [routines, setRoutines] = useState({});
  const [sessions, setSessions] = useState({});
  const [exercises, setExercises] = useState({});
  const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10); 

  const loadUser = (user) => {
    setUser(user);
  };

  const loadRoutines = (routines) => {
    console.log('loadRoutines', routines);
    setRoutines(routines);
  };

  const loadSessions = (sessions) => {
    setSessions(sessions);
  };

  const loadExercises = (exercises) => {
    setExercises(exercises);
  };

  const toLocaleString = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().padStart(2, '0');
    const hour = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${day}/${month}/${year} ${hour}:${minutes}:${seconds}`;
  };

  return (
    <DataContext.Provider value={{ nanoid, user, routines, sessions, exercises, loadUser, loadRoutines, loadSessions, loadExercises, toLocaleString }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => React.useContext(DataContext);

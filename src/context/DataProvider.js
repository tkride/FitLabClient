import React, { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [routines, setRoutines] = useState({});
  const [sessions, setSessions] = useState({});
  const [exercises, setExercises] = useState({});

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

  return (
    <DataContext.Provider value={{ user, routines, sessions, exercises, loadUser, loadRoutines, loadSessions, loadExercises }}>
      {children}
    </DataContext.Provider>
  );
};

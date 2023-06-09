import React, { createContext, useState } from 'react';
import { customAlphabet } from 'nanoid/non-secure'
import { getExercises, getRoutines, getSessions } from '../Services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  const loadExercises = (exercises) => {
    setExercises(exercises);
  };

  const loadRoutines = (routines) => {
    console.log('loadRoutines', routines);
    setRoutines(routines);
  };

  const loadSessions = (sessions) => {
    setSessions(sessions);
  };

  const loadUserInfo = async (username) => {
    const exercisesData = await getExercises(username);
    setExercises(exercisesData);
    const routinesData = await getRoutines(username);
    setRoutines(routinesData);
    const sessionsData = await getSessions(username);
    setSessions(sessionsData);
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

  const saveToStorage = async (data) => {
    for (const key in data) {
      await AsyncStorage.setItem(key, data[key]);
    }
  }

  const loadFromStorage = async (keys) => {
    const data = {};
    for (const key of keys) {
      data[key] = await AsyncStorage.getItem(key);
    }
    return data;
  }

  const removeFromStorage = async (keys) => {
    for (const key of keys) {
      await AsyncStorage.removeItem(key);
    }
  }

  const dataContextValue = {
    nanoid,
    user,
    routines,
    sessions,
    exercises,
    loadUser,
    loadUserInfo,
    loadRoutines,
    loadSessions,
    loadExercises,
    toLocaleString,
    saveToStorage,
    loadFromStorage,
    removeFromStorage,
  };

  return (
    <DataContext.Provider value={dataContextValue}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => React.useContext(DataContext);

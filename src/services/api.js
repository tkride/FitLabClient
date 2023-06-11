import Config from "../config/Config";

// User

export const requestLogin = async (username, password) => {
  const response = await fetch(`${Config.REQUESTS.LOGIN}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  const data = await response.json();
  return data;
};

export const requestSignup = async (username, password) => {
  const response = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  const data = await response.json();
  return data;
};

export const addUser = async (username, password) => {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  const data = await response.json();
  return data;
};

export const updateUser = async (user, username, password) => {
  const response = await fetch(`${API_URL}/users/${user}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  const data = await response.json();
  return data;
};

export const deleteUser = async (user) => {
  const response = await fetch(`${API_URL}/users/${user}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user }),
  });
  const data = await response.json();
  return data;
};

// Exercise

export const getExercises = async (user) => {
  try {
    let request = `${Config.REQUESTS.EXERCISES}`;
    const method = Config.METHODS.POST;
    const headers = Config.HEADERS;
    const body = JSON.stringify({ user });
    const response = await fetch(request, { method, headers, body });
    const data = await response.json();
    // console.log('ejercicios cargados: ', data);
    return data;
  }
  catch (error) {
    console.log('EXCEPTION: ', error)
  }
};

export const addExercise = async (user, exercise) => {
  const response = await fetch(`${API_URL}/exercises/${user}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ exercise }),
  });
  const data = await response.json();
  return data;
};

export const updateExercise = async (user, exercise) => {
  const response = await fetch(`${API_URL}/exercises/${user}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ exercise }),
  });
  const data = await response.json();
  return data;
};

export const deleteExercise = async (user, exercise) => {
  const response = await fetch(`${API_URL}/exercises/${user}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ exercise }),
  });
  const data = await response.json();
  return data;
};

// Routine

export const getRoutines = async (user) => {
  try {
    let request = `${Config.REQUESTS.ROUTINES}`;
    const method = Config.METHODS.POST;
    const headers = Config.HEADERS;
    const body = JSON.stringify({ user });
    const response = await fetch(request, { method, headers, body });
    const data = await response.json();
    return data;
  }
  catch (error) {
    console.log('EXCEPTION: ', error)
  }
};

export const addRoutine = async (user, routine) => {
  const response = await fetch(`${API_URL}/routines/${user}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ routine }),
  });
  const data = await response.json();
  return data;
};

export const updateRoutine = async (user, routine) => {
  const response = await fetch(`${API_URL}/routines/${user}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ routine }),
  });
  const data = await response.json();
  return data;
};

export const deleteRoutine = async (user, routine) => {
  const response = await fetch(`${API_URL}/routines/${user}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ routine }),
  });
  const data = await response.json();
  return data;
};

// Session

export const getSessions = async (user) => {
  let request = Config.REQUESTS.SESSIONS;
  const method = Config.METHODS.POST;
  const headers = Config.HEADERS;
  const body = JSON.stringify({ user });
  const response = await fetch(request, { method, headers, body });
  const data = await response.json();
  return data;
};

export const addSession = async (user, session) => {
  const response = await fetch(`${API_URL}/sessions/${user}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ session }),
  });
  const data = await response.json();
  return data;
};

export const updateSession = async (user, session) => {
  const response = await fetch(`${API_URL}/sessions/${user}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ session }),
  });
  const data = await response.json();
  return data;
};

export const deleteSession = async (user, session) => {
  const response = await fetch(`${API_URL}/sessions/${user}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ session }),
  });
  const data = await response.json();
  return data;
};

// Translations

export const getTranslations = async (user) => {
  let request = Config.REQUESTS.TRANSLATIONS;
  const method = Config.METHODS.POST;
  const headers = Config.HEADERS;
  const body = JSON.stringify({ user });
  const response = await fetch(request, { method, headers, body });
  const data = await response.json();
  return data;
};

// Favorites

// export const getFavorites = async (user) => {
//   let request = Config.REQUESTS.FAVORITES;
//   const method = Config.METHODS.POST;
//   const headers = Config.HEADERS;
//   const body = JSON.stringify({ user });
//   const response = await fetch(request, { method, headers, body });
//   const data = await response.json();
//   return data;
// };

export const addFavorites = async ({user, type, id}) => {
  console.log('addFavorites: ', user, type, id);
  
  let request = Config.REQUESTS.FAVORITES;
  const method = Config.METHODS.POST;
  const headers = Config.HEADERS;
  const body = JSON.stringify({ user, type, id });
  const response = await fetch(request, { method, headers, body });
  const data = await response.json();
  return data.res;
};

export const deleteFavorites = async ({user, type, id}) => {
  console.log('deleteFavorites: ', user, type, id);

  let request = Config.REQUESTS.FAVORITES;
  const method = Config.METHODS.DELETE;
  const headers = Config.HEADERS;
  const body = JSON.stringify({ user, type, id });
  const response = await fetch(request, { method, headers, body });
  const data = await response.json();
  return data.res;
};
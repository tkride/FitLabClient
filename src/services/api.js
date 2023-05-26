import Config from "../config/Config";

export const requestExercises = async (user) => {
  try {
    let request = `${Config.REQUESTS.EXERCISES}`;
    const method = Config.METHODS.POST;
    const headers = Config.HEADERS;
    const body = JSON.stringify({ user });
    const response = await fetch(request, { method, headers, body });
    const data = await response.json();
    console.log('ejercicios cargados: ', data);
    return data;
  }
  catch (error) {
    console.log('EXCEPTION: ', error)
  }
};

export const requestRoutines = async (user) => {
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

export const requestSessions = async (user) => {
  let request = Config.REQUESTS.SESSIONS;
  const method = Config.METHODS.POST;
  const headers = Config.HEADERS;
  const body = JSON.stringify({ user });
  const response = await fetch(request, { method, headers, body });
  const data = await response.json();
  return data;
};

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

export const requestAddRoutine = async (user, routine) => {
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

export const requestAddSession = async (user, session) => {
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

export const requestAddExercise = async (user, exercise) => {
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

export const requestDeleteRoutine = async (user, routine) => {
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

export const requestDeleteSession = async (user, session) => {
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

export const requestDeleteExercise = async (user, exercise) => {
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

export const requestUpdateRoutine = async (user, routine) => {
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

export const requestUpdateSession = async (user, session) => {
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

export const requestUpdateExercise = async (user, exercise) => {
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

export const requestUpdateUser = async (user, username, password) => {
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

export const requestDeleteUser = async (user) => {
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

export const requestAddUser = async (username, password) => {
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


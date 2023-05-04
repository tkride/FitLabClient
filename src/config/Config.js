
const BASE_URL = 'http://192.168.1.129:5000/v1';

const Config = {
  REQUESTS: {
    EXERCISES: BASE_URL + '/exercises',
    ROUTINES: BASE_URL + '/routines',
    SESSIONS: BASE_URL + '/sessions',
    USERS: BASE_URL + '/users',
    LOGIN: BASE_URL + '/login',
    REGISTER: BASE_URL + '/register',
    LOGOUT: BASE_URL + '/logout',
    ANALYZE_SESSION: BASE_URL + '/analyze/session',
    ANALYZE_ROUTINE: BASE_URL + '/analyze/routine',
  },
  ROUTES: {
      SESSIONS: '/sessions',
      ROUTINES: '/routines',
      USERS: '/users',
      LOGIN: '/login',
      REGISTER: '/register',
      LOGOUT: '/logout',
      ANALYZE_SESSION: '/analyze/session',
      ANALYZE_ROUTINE: '/analyze/routine',
  },
  METHODS: {
      GET: 'GET',
      POST: 'POST',
      PUT: 'PUT',
      DELETE: 'DELETE',
  },
//   HEADERS: {
//       CONTENT_TYPE: 'Content-Type',
//       APPLICATION_JSON: 'application/json; charset=UTF-8',
//   },
  HEADERS: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
  ERRORS: {
      INVALID_CREDENTIALS: 'Invalid credentials',
      INVALID_SESSION: 'Invalid session',
      INVALID_TOKEN: 'Invalid token',
      USER_NOT_FOUND: 'User not found',
      USER_ALREADY_EXISTS: 'User already exists',
      USER_NOT_LOGGED_IN: 'User not logged in',
      ROUTINE_NOT_FOUND: 'Routine not found',
      ROUTINE_ALREADY_EXISTS: 'Routine already exists',
      SESSION_NOT_FOUND: 'Session not found',
      SESSION_ALREADY_EXISTS: 'Session already exists',
      EXERCISE_NOT_FOUND: 'Exercise not found',
      EXERCISE_ALREADY_EXISTS: 'Exercise already exists',
      SET_NOT_FOUND: 'Set not found',
      SET_ALREADY_EXISTS: 'Set already exists',
      REP_NOT_FOUND: 'Rep not found',
      REP_ALREADY_EXISTS: 'Rep already exists',
      WEIGHT_NOT_FOUND: 'Weight not found',
      WEIGHT_ALREADY_EXISTS: 'Weight already exists',
      TIME_NOT_FOUND: 'Time not found',
      TIME_ALREADY_EXISTS: 'Time already exists',
  },
  MESSAGES: {
      LOGGED_IN: 'Logged in successfully',
      LOGGED_OUT: 'Logged out successfully',
      REGISTERED: 'Registered successfully',
      CREATED: 'Created successfully',
      UPDATED: 'Updated successfully',
      DELETED: 'Deleted successfully',
      DELETED_SESSION: 'Session deleted successfully',
      DELETED_ROUTINE: 'Routine deleted successfully',
      DELETED_EXERCISE: 'Exercise deleted successfully',
      DELETED_SET: 'Set deleted successfully',
      DELETED_REP: 'Rep deleted successfully',
      DELETED_WEIGHT: 'Weight deleted successfully',
      DELETED_TIME: 'Time deleted successfully',
  },
};

export default Config;
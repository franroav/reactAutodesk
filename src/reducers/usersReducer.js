import { createReducer, Types as ReduxSauceTypes } from "reduxsauce";
import {
  GET_ALL_USER,
  GET_ONE_USER,
  DELETE_ONE_USER,
  UPDATE_ONE_USER,
  CREATE_ONE_USER,
  USER_LOADING,
  USER_LOADING_OFF,
  RESET_USER_DATA,
} from "../actions/types";

// Initial STATE (en el initial state es el estado mutable que cambnia con los reducers )

const INITIAL_STATE = {
  users: {},
  loading: false,
};
// el action es el que contendra la data del reducer

const getAllUsers = (state, action) => {
  return {
    ...state,
    users: action.users,
  };
};

const getOneUser = (state, action) => {
  return {
    ...state,
    users: action.Users,
  };
};

const createUser = (state, action) => {
  return {
    ...state,
    users: action.users,
  };
};
const updateUser = (state, action) => {
  return {
    ...state,
    users: action.users,
  };
};
const deleteUser = (state, action) => {
  return {
    ...state,
    users: action.users,
  };
};
// retorna un objeto vacío en el reset
const resetData = (state = INITIAL_STATE) => ({
  ...state,
  users: {},
});

const loadingIni = (state = INITIAL_STATE) => ({
  ...state,
  loading: true,
});

const loadingOff = (state = INITIAL_STATE) => ({
  ...state,
  loading: false,
});
// EL ACTION VA ENTRE LAS []
const HANDLERS = {
  [GET_ALL_USER]: getAllUsers,
  [GET_ONE_USER]: getOneUser,
  [CREATE_ONE_USER]: createUser,
  [UPDATE_ONE_USER]: updateUser,
  [DELETE_ONE_USER]: deleteUser,
  [USER_LOADING]: loadingIni,
  [USER_LOADING_OFF]: loadingOff,
  [RESET_USER_DATA]: resetData,

  [ReduxSauceTypes.DEFAULT]: (state) => state,
};

// ReduxSauceTypes-> default (retorna el state);

export default createReducer(INITIAL_STATE, HANDLERS);

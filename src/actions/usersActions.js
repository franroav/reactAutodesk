import {
  GET_ALL_USER,
  GET_ONE_USER,
  DELETE_ONE_USER,
  UPDATE_ONE_USER,
  CREATE_ONE_USER,
  USER_LOADING,
  USER_LOADING_OFF,
  RESET_USER_DATA,
} from "./types";
import {
  getAll,
  getById,
  create,
  update,
  deleteById,
} from "../services/users.service";

export const getAllUsers = (users, element) => (dispatch) => {
  getAll()
    .then((response) => {
      dispatch(fetchUsersReducer(response.data));
    })
    .catch(() => {});
};

export const getOneUser = (users, element) => (dispatch) => {
  getById()
    .then((response) => {
      dispatch(getOneUserReducer(response.payload));
    })
    .catch(() => {});
};

export const createOneUser = (users, element) => (dispatch) => {
  create()
    .then((response) => {
      dispatch(createUserReducer(response.data));
    })
    .catch(() => {});
};

export const updateOneUser = (users, element) => (dispatch) => {
  update()
    .then((response) => {
      dispatch(updateUserReducer(response.data));
    })
    .catch(() => {});
};

export const deleteOneUser = (users, element) => (dispatch) => {
  deleteById()
    .then((response) => {
      dispatch(deleteOneUserReducer(response.data));
    })
    .catch(() => {});
};

const loadingIni = () => ({
  type: USER_LOADING,
});

const loadingOff = () => ({
  type: USER_LOADING_OFF,
});

const fetchUsersReducer = (users) => ({
  type: GET_ALL_USER,
  users,
});

const createUserReducer = (users) => ({
  type: CREATE_ONE_USER,
  users,
});

const updateUserReducer = (users) => ({
  type: UPDATE_ONE_USER,
  users,
});

const getOneUserReducer = (users) => ({
  type: GET_ONE_USER,
  users,
});

const deleteOneUserReducer = (users) => ({
  type: DELETE_ONE_USER,
  users,
});
const resetData = () => ({
  type: RESET_USER_DATA,
});

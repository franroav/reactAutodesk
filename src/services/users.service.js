import axios from "axios";
//const baseUrl = `https://autodesk.free.beeceptor.com/autodesk/api/users`;
const baseUrl = `https://jsonplaceholder.typicode.com/users`;
const getAll = async () => {
  try {
    return axios({
      method: "get",
      url: "https://jsonplaceholder.typicode.com/users",
    }).then(
      (result) => {
        return result;
      },
      (error) => {
        return { error: "Error: " + error.message };
      }
    );
  } catch (err) {
    return { error: "Error: " + err.message };
  }
};

const getById = async (id) => {
  try {
    return axios({
      method: "get",
      url: baseUrl + `/${id}`,
    }).then(
      (result) => {
        return result.data;
      },
      (error) => {
        return { error: "Error: " + error.message };
      }
    );
  } catch (err) {
    return { error: "Error: " + err.message };
  }
};

const create = async (body) => {
  try {
    return axios({
      method: "post",
      url: baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(body),
    }).then(
      (result) => {
        return result;
      },
      (error) => {
        return { error: "Error: " + error.message };
      }
    );
  } catch (err) {
    return { error: "Error: " + err.message };
  }
};

const update = async (id, body) => {
  try {
    return axios({
      method: "put",
      url: baseUrl + `/${id}`,
      body: body,
    }).then(
      (result) => {
        return result;
      },
      (error) => {
        return { error: "Error: " + error.message };
      }
    );
  } catch (err) {
    return { error: "Error: " + err.message };
  }
};

const deleteById = async (id) => {
  try {
    return axios({
      method: "delete",
      url: baseUrl + `/${id}`,
    }).then(
      (result) => {
        return result;
      },
      (error) => {
        return { error: "Error: " + error.message };
      }
    );
  } catch (err) {
    return { error: "Error: " + err.message };
  }
};

export { getAll, getById, create, update, deleteById };

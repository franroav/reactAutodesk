import {
  getAllUsers,
  getOneUser,
  createOneUser,
  updateOneUser,
  deleteOneUser,
} from "../../actions/usersActions";
import { decreaseButton, increaseButton } from "../../actions/buttonsActions";
import React, { Fragment, useState, useEffect } from "react";
import { create } from "../../services/users.service";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
//import { useParams } from "react-router-dom";
import MaterialTable from "material-table";
import { Card } from "@material-ui/core";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

let name;
let phone;
let email;
let username;
let specification;
let type;
let description;
let validForm = false;
const insertUsert = async () => {
  if (validForm) {
    const createuser = create({
      name,
      phone,
      email,
      username,
      specification,
      description,
    });
    if (createuser.error) {
      validForm = false;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "there was an error when trying to insert a new record",
        footer: "Why do I have this issue? Please try some other time",
      });
    }
    Swal.fire("user created succesfully");
  }
};

const validateFormValues = async () => {
  if (name === null || phone === null || email === null || username === null) {
    validForm = false;
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "fields can't be empty!",
    });
  } else {
    validForm = true;
  }
};
const templateForm = async () => {
  name =
    document.getElementById("name").value === ""
      ? null
      : document.getElementById("name").value;
  phone =
    document.getElementById("phone").value === ""
      ? null
      : document.getElementById("phone").value;
  email =
    document.getElementById("email").value === ""
      ? null
      : document.getElementById("email").value;
  username =
    document.getElementById("username").value === ""
      ? null
      : document.getElementById("username").value;
  specification =
    document.getElementById("specification").value === ""
      ? null
      : document.getElementById("specification").value;
  type =
    document.getElementById("type").value === ""
      ? null
      : document.getElementById("type").value;
  description =
    document.getElementById("description").value === ""
      ? null
      : document.getElementById("description").value;
};

const modalForm = async (e) => {
  const { value: formValues } = await Swal.fire({
    title: "User Form",
    showCancelButton: true,
    confirmButtonText: "Create",
    confirmButtonColor: "#3C99DC",
    html:
      '<div class="card">' +
      '<div class="card-header"><small>Create a new user!</small></div>' +
      '<div class="card-body">' +
      '<div class="form-group row">' +
      '<label for="email" class="col-sm-2 col-form-label"><i class="fa fa-envelope"></i></label>' +
      '<div class="col-sm-10">' +
      '<input id="email" type="email" class="form-control form-control-lg" placeholder="Email..." required>' +
      "</div>" +
      "</div>" +
      '<div class="form-group row">' +
      '<label for="name" class="col-sm-2 col-form-label"><small><i class="fa fa-user"></i></small></label>' +
      '<div class="col-sm-10">' +
      '<input id="name" type="text" class="form-control form-control-lg" placeholder="Name.." required >' +
      "</div>" +
      "</div>" +
      '<div class="form-group row">' +
      '<label for="username" class="col-sm-2 col-form-label"><i class="fa fa-address-book-o"></i></label>' +
      '<div class="col-sm-10">' +
      '<input id="username" type="text" class="form-control form-control-lg" placeholder="Username.." required>' +
      "</div>" +
      "</div>" +
      '<div class="form-group row">' +
      '<label for="username" class="col-sm-2 col-form-label"><small><i class="fa fa-phone"></i></small></label>' +
      '<div class="col-sm-10">' +
      '<input id="phone" type="text" class="form-control form-control-lg" placeholder="Phone.." required>' +
      "</div>" +
      "</div>" +
      '<div class="form-group row">' +
      '<label for="specification" class="col-sm-2 col-form-label"><i class="fa fa-briefcase"></i></label>' +
      '<div class="col-sm-10">' +
      '<select id="specification" class="form-select form-select-sm form-control form-control-lg" required>' +
      "<option selected>" +
      "Select spec section" +
      "</option>" +
      '<option value="opcion 1" >' +
      "opcion 1" +
      "</option>" +
      '<option value="opcion 2" >' +
      "opcion 2" +
      "</option>" +
      '<option value="opcion 3" >' +
      "opcion 3" +
      "</option>" +
      '<option value="opcion 4" >' +
      "opcion 4" +
      "</option>" +
      "</select>" +
      "</div>" +
      "</div>" +
      '<div class="form-group row">' +
      '<label for="description" class="col-sm-2 col-form-label"><i class="fa fa-comment-o"></i></label>' +
      '<div class="col-sm-10">' +
      '<textarea id="description" type="text" class="form-control form-control-lg" placeholder="Description..">' +
      "</textarea>" +
      "</div>" +
      "</div>" +
      '<div class="form-group row">' +
      '<label for="type" class="col-sm-2 col-form-label"><i class="fa fa-cogs"></i></label>' +
      '<div class="col-sm-10">' +
      '<select id="type" class="form-select form-select-sm form-control form-control-lg" required>' +
      "<option selected>" +
      "Select type" +
      "</option>" +
      '<option value="type 1" >' +
      "type 1" +
      "</option>" +
      '<option value="type 2" >' +
      "type 2" +
      "</option>" +
      '<option value="type 3" >' +
      "type 3" +
      "</option>" +
      '<option value="type 4" >' +
      "type 4" +
      "</option>" +
      "</select>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>",
    focusConfirm: false,
    preConfirm: async () => {
      const setFormValues = await templateForm();
      const validateFields = await validateFormValues();
      const createUser = await insertUsert();
    },
  });
};

const Users = ({
  getAllUsers,
  getOneUser,
  createOneUser,
  updateOneUser,
  deleteOneUser,
  userReducer,
  buttonReducer,
  increaseButton,
  decreaseButton,
}) => {
  const [searchInReducer, setSearchInReducer] = useState(false);
  const listOfUsers = [];

  const columns = [
    { title: "ID", field: "id" },
    { title: "Name", field: "name" },
    {
      title: "Username",
      field: "username",
      render: (rowData) => (
        <small>
          <i className="fa fa-user"> {rowData.username}</i>
        </small>
      ),
    },
    {
      title: "Phone",
      field: "phone",
      render: (rowData) => (
        <small>
          <i className="fa fa-phone"> {rowData.phone}</i>
        </small>
      ),
    },
    {
      title: "Email",
      field: "email",
      render: (rowData) => (
        <small>
          <i className="fa fa-envelope"> {rowData.email}</i>
        </small>
      ),
    },
    {
      title: "Company",
      field: "company",
      render: (rowData) => (
        <ul>
          <li>
            <small>{rowData.company.name}</small>
          </li>
          <li>
            <small>{rowData.company.bs}</small>
          </li>
          <li>
            <small>{rowData.company.catchPhrase}</small>
          </li>
        </ul>
      ),
    },
    {
      title: "Address",
      field: "address",
      render: (row) => {
        return (
          <>
            <ul>
              <li>
                <small>
                  <i className="fa fa-building">{row.address.city}</i>
                </small>
              </li>
              <li>
                <small>
                  <i className="fa fa-home"></i>
                  {row.address.street}
                </small>
              </li>
              <li>
                <small>{row.address.suite}</small>
              </li>
              <li>
                <small>{row.address.zipcode}</small>
              </li>
            </ul>
          </>
        );
      },
    },
    { title: "Website", field: "website" },
  ];

  if (searchInReducer) {
    const { users } = userReducer;
    const UsersCollection = users;
    if (UsersCollection !== undefined && UsersCollection.length) {
      for (const [index, user] of users.entries()) {
        listOfUsers.push({
          ...user,
        });
      }
    }
  } else {
    console.log("aun no hay data");
  }

  const history = useHistory();

  const userDetails = (row, caso) => {
    history.push(`/users/${row.id}`);
  };

  useEffect(() => {
    const loadUsers = async () => {
      const data = await getAllUsers();
      setSearchInReducer(true);
    };

    loadUsers();
  }, []);

  return (
    <Fragment>
      <div className="row">
        <div className="offset-md-2 col-md-2 card py-1 px-1">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => modalForm(e)}
          >
            Create User
          </button>
        </div>
      </div>
      <div className=" row">
        <div className="col-md-8 offset-md-2 card">
          <Card>
            <MaterialTable
              columns={columns}
              data={listOfUsers}
              title="Users"
              actions={[
                {
                  //icon: "remove_red_eye",
                  icon: "remove_red_eye",
                  tooltip: "View User",
                  onClick: (event, rowData) => userDetails(rowData, "view"),
                },
              ]}
              options={{
                actionsColumnIndex: -1,
                filtering: true,
                sorting: true,
                exportButton: true,
                fixedColumns: {
                  left: 1,
                  right: 0,
                },
              }}
              localization={{
                header: {
                  actions: "Acciones",
                },
              }}
            />
          </Card>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateProps = ({ userReducer, buttonReducer }) => ({
  userReducer,
  buttonReducer,
});

export default connect(mapStateProps, {
  getAllUsers,
  getOneUser,
  createOneUser,
  updateOneUser,
  deleteOneUser,
  increaseButton,
  decreaseButton,
})(Users);

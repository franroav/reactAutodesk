import {
  getAllUsers,
  getOneUser,
  createOneUser,
  updateOneUser,
  deleteOneUser,
} from "../../actions/usersActions";
import { decreaseButton, increaseButton } from "../../actions/buttonsActions";
import React, { Fragment, useContext, useState, useEffect } from "react";
import { create } from "../../services/users.service";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
//import { useParams } from "react-router-dom";
import MaterialTable from "material-table";
import { Card } from "@material-ui/core";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const Hola = (e) => {
  console.log(e);
};

const modalForm = async (e) => {
  let name;
  let phone;
  let email;
  let username;
  let validForm = false;
  const { value: formValues } = await Swal.fire({
    title: "User Form",
    html:
      '<div class="card">' +
      '<div class="card-header"><small>Create a new user!</small></div>' +
      '<div class="card-body">' +
      '<div class="form-group row">' +
      '<label for="inputEmail3" class="col-sm-2 col-form-label"><i class="fa fa-envelope"></i></label>' +
      '<div class="col-sm-10">' +
      '<input id="swal-input3" type="email" class="swal2-input form-control form-control-lg" placeholder="Email...">' +
      "</div>" +
      "</div>" +
      '<div class="form-group row">' +
      '<label for="name" class="col-sm-2 col-form-label"><small>Name</small></label>' +
      '<div class="col-sm-10">' +
      '<input id="swal-input1" type="text" class="form-control form-control-lg" placeholder="Name..">' +
      "</div>" +
      "</div>" +
      '<div class="form-group row">' +
      '<label for="username" class="col-sm-2 col-form-label"><i class="fa fa-user"></i></label>' +
      '<div class="col-sm-10">' +
      '<input id="swal-input4" type="text" class="form-control form-control-lg" placeholder="Username..">' +
      "</div>" +
      "</div>" +
      '<div class="form-group row">' +
      '<label for="username" class="col-sm-2 col-form-label"><small><i class="fa fa-phone"></i></small></label>' +
      '<div class="col-sm-10">' +
      '<input id="swal-input2" type="text" class="form-control form-control-lg" placeholder="Phone..">' +
      "</div>" +
      "</div>" +
      '<div class="form-group row">' +
      "</div>" +
      "</div>" +
      "</div>",
    focusConfirm: false,
    preConfirm: async () => {
      name =
        document.getElementById("swal-input1").value === ""
          ? null
          : document.getElementById("swal-input1").value;
      phone =
        document.getElementById("swal-input2").value === ""
          ? null
          : document.getElementById("swal-input2").value;
      email =
        document.getElementById("swal-input3").value === ""
          ? null
          : document.getElementById("swal-input3").value;
      username =
        document.getElementById("swal-input4").value === ""
          ? null
          : document.getElementById("swal-input4").value;
      const template = { name, phone, email, username };
      const createuser = create(template);
      if (createuser.error) {
        validForm = false;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "there was an error when trying to insert a new record",
          footer: "Why do I have this issue? Please try some other time",
        });
      }
    },
  });
  console.log(e);

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

  if (validForm) {
    Swal.fire("user created succesfully");
  }
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
  const [firstUser, setUser] = useState("");
  const [count, setCounter] = useState(0);
  const [UserList, UserBucket] = useState([]);
  const listOfUsers = [];
  // const { indicador } = useParams();

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

    console.log({ UsersCollection });
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

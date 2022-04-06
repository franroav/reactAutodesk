import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOneUser } from "../../../actions/usersActions";
import { getById } from "../../../services/users.service";
import { useHistory } from "react-router-dom";

const UserList = (props) => {
  const user = props.user;
  return (
    <ul className="list-group mb-3">
      <li>
        <span class="badge badge-light"> N°: {user.id}</span>
      </li>
      <li>
        <i className="fa fa-user"></i> {user.username}
      </li>
      <li>
        <a href={`tel:${user.phone}`}>
          <i className="fa fa-phone"></i> {user.phone}
        </a>
      </li>
      <li>
        <a href={`mailto:${user.email}`}>
          <i className="fa fa-envelope"></i> {user.email}
        </a>
      </li>
      <li>
        <span class="badge badge-primary">{user.website}</span>
      </li>
    </ul>
  );
};

const UserDetail = () => {
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [comanyName, setComanyName] = useState("");
  const [comanyBs, setComanyBs] = useState("");
  const [comanyCatchPhrase, setComanyCatchPhrase] = useState("");
  const [addressCity, setAddressCity] = useState("");
  const [addressStreet, setAddressStreet] = useState("");
  const [addressSuite, setAddressSuite] = useState("");
  const [addressZipcode, setAddressZipcode] = useState("");
  const history = useHistory();
  const { id } = useParams();

  const peticionGet = async () => {
    let user = await getById(id);
    setUser(user);
    if (user.error) {
      alert("Hubo un problema o no se encuentra el registro");
      history.push(`/users`);
    }
    console.log(user);
    setName(user.name);
    setComanyName(user.company.name);
    setComanyBs(user.company.bs);
    setComanyCatchPhrase(user.company.catchPhrase);
    setAddressCity(user.address.city);
    setAddressStreet(user.address.street);
    setAddressSuite(user.address.suite);
    setAddressZipcode(user.address.zipcode);
  };

  useEffect(() => {
    peticionGet();
  }, []);

  return (
    <Fragment>
      <div className="container">
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <h3>
                <span className="badge badge-dark">{name}</span>
              </h3>
            </div>
          </div>
          <div className="card-body">
            <UserList user={user} />
            <ul className="list-group mb-3">
              <li>
                <small>Company:</small>
                <ul>
                  <li>Name: {comanyName}</li>
                  <li>catchPhrase: {comanyCatchPhrase}</li>
                  <li>Bs: {comanyBs}</li>
                </ul>
              </li>
              <li>
                <small>Address:</small>
                <ul>
                  <li>City: {addressCity}</li>
                  <li>Street: {addressStreet}</li>
                  <li>Suite: {addressSuite}</li>
                  <li>Zipcode: {addressZipcode}</li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="card-footer">
            <small className="text-muted">
              <em>User Details.</em>
            </small>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UserDetail;

import React, { Fragment, useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOneUser } from "../../../actions/usersActions";
import { getById } from "../../../services/users.service";
import { useHistory } from "react-router-dom";

const UserDetail = () => {
  const [data, setData] = useState([{}]);
  const [userId, setId] = useState(0);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [comanyName, setComanyName] = useState("");
  const [comanyBs, setComanyBs] = useState("");
  const [comanyCatchPhrase, setComanyCatchPhrase] = useState("");
  const [addressCity, setAddressCity] = useState("");
  const [addressStreet, setAddressStreet] = useState("");
  const [addressSuite, setAddressSuite] = useState("");
  const [addressZipcode, setAddressZipcode] = useState("");

  /*const [billed_hours, setBilledHours] = useState(0);
  const [billed_at, setBilledAt] = useState("");
  const [billing_currency, setBillingCurrency] = useState("");
  const [billed_amount, setBilledAmount] = useState(0);
  const [needs_exchange, setNeedsExchange] = useState(false);
  const [exchange_currency, setExchangeCurrency] = useState("");
  const [description, setDescription] = useState("");*/
  let user;
  const history = useHistory();
  const { id } = useParams();

  const peticionGet = async () => {
    user = await getById(id);
    if (user.error) {
      alert("Hubo un problema o no se encuentra el registro");
      history.push(`/users`);
    }
    console.log(user);
    setId(user.id);
    setName(user.name);
    setUsername(user.username);
    setPhone(user.phone);
    setEmail(user.email);
    setWebsite(user.website);
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
                <span class="badge badge-dark">{name}</span>
              </h3>
            </div>
          </div>
          <div className="card-body">
            <ul className="list-group mb-3">
              <li>
                <span class="badge badge-light"> N°: {userId}</span>
              </li>
              <li>
                <i className="fa fa-user"></i> {username}
              </li>
              <li>
                <a href={`tel:${phone}`}>
                  <i className="fa fa-phone"></i> {phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${email}`}>
                  <i className="fa fa-envelope"></i> {email}
                </a>
              </li>
              <li>
                <span class="badge badge-primary">{website}</span>
              </li>
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

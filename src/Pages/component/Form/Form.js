import { useState, useEffect, useId } from "react";
import Table from "../Table/Table";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  deleteUser,
  postUserCred,
  updateUser,
  fetchUser,
} from "../../UserAuth/UserAuth";
import UserForm from "../../User/UserForm";
import { useParams, useNavigate } from "react-router-dom";

const Form = () => {
  const [formData, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    personId: "",
  });
  const [personId, setPersonId] = useState(0);
  const [errorObject, seterrorObject] = useState({});
  const [Status, setStatus] = useState(false);
  const [selectedId, setselectedId] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const userId = params.id;
  //   const acessStateTable = useSelector((state) => state.list);
  const getUpdatedCredentials = useSelector(
    (state) => state.counter.emptyObject
  );

  console.log(getUpdatedCredentials.data);
  useEffect(() => {
    if (userId) {
      dispatch(fetchUser(userId));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    const { name, phone, email } = getUpdatedCredentials;

    if (userId) {
      setForm({ name, phone, email });
      setStatus(true);
      setselectedId(userId);
    }

    return () => {
      setForm({ name: "", phone: "", email: "" });
    };
  }, [getUpdatedCredentials]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formSubmit = (event) => {
    event.preventDefault();

    const emptyObject = {};
    if (formData.name === "") {
      emptyObject.userName = "*Name Required";
    } else if (formData.name.length <= 2) {
      emptyObject.userName = "*Name characters should be greater than 2";
    }

    if (formData.email === "") {
      emptyObject.userEmail = "*Email Required";
    } else if (!formData.email.includes("@")) {
      emptyObject.userEmail = "*Email must include @ format";
    }

    if (formData.phone === "") {
      emptyObject.userPhone = "*Phone Required";
    } else if (formData.phone.length !== 10) {
      emptyObject.userPhone = "*Phone number length to be 10";
    }

    const objectLength = Object.keys(emptyObject).length;

    if (objectLength === 0) {
      setPersonId(personId + 1);
      formData.personId = personId;
      dispatch(postUserCred(formData));

      setForm({
        name: "",

        email: "",
        phone: "",
      });
      seterrorObject({});
    } else {
      seterrorObject(emptyObject);
    }
  };

  const usercheckTable = () => {
    // navigate("/");
  };

  const userUpdate = () => {
    // const acessUserIndex = acessStateTable.findIndex(
    //   (each) => parseInt(each.personId) === parseInt(selectedId)
    // );
    const userUpdatedRow = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    };
    dispatch(updateUser({ userId, userUpdatedRow }));

    setForm({ name: "", email: "", phone: "" });
    setStatus(false);
  };

  const token = localStorage.getItem("jwt_Token");

  // useEffect(() => {
  //   if (!token) {
  //     return navigate("/");
  //   }
  // });
  if (!token) {
    return navigate("/");
  }
  return (
    <div className="formPage">
      <div className="form">
        <form onSubmit={formSubmit}>
          <label>Name:</label>
          <br />
          <input
            onChange={handleChange}
            type="text"
            name="name"
            value={formData.name}
          />
          {Object.keys(errorObject).length === 0 ? null : (
            <p className="Required">{errorObject.userName}</p>
          )}
          <br />

          <label>Email:</label>
          <br />
          <input
            onChange={handleChange}
            type="text"
            name="email"
            value={formData.email}
          />
          {Object.keys(errorObject).length === 0 ? null : (
            <p className="Required">{errorObject.userEmail}</p>
          )}
          <br />
          <label>phone:</label>
          <br />
          <input
            onChange={handleChange}
            type="text"
            name="phone"
            value={formData.phone}
          />
          {Object.keys(errorObject).length === 0 ? null : (
            <p className="Required">{errorObject.userPhone}</p>
          )}
          <br />

          {Status ? "" : <button type="submit">Submit</button>}
        </form>
        {Status ? <button onClick={userUpdate}>Update</button> : ""}
      </div>
      <Link to="/Table">
        <button onClick={usercheckTable}>Check table</button>{" "}
      </Link>
    </div>
  );

  // return navigate("/");
};

export default Form;

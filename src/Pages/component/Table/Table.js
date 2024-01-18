import "./Table.css";
import { useEffect } from "react";
// import { fetchUsers, deleteUser } from "../../Redux/Action/Action";
import { fetchUsers, deleteUser, updateUser } from "../../UserAuth/UserAuth";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link, useHistory } from "react-router-dom";
import UserForm from "../../User/UserForm";

const Table = () => {
  const userTable = useSelector((state) => state.counter);

  //   const userId = useSelector((state) => state.srNo);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const userRowEdit = (index) => {
    const { personId, _id } = index;
    // dispatch({ type: "Edit_User", payload: _id });
    // dispatch(fetchUsers());
    navigate(`/Form/${_id}`);
  };

  const stateacess = () => {
    if (userTable.loading === true) {
      console.log("spinner");
    } else if (userTable.data !== null) {
      console.log(userTable.data);
      console.log("data is avilable");
      return (
        <table className="userTable">
          <tr>
            <th>Sr.no</th>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
          {userTable.data.data.map((each, index) => {
            return (
              <tr key={each.personId}>
                <th className="view">{each.personId}</th>
                <th className="view">{each.name}</th>
                <th className="view">{each.phone}</th>
                <th className="view">{each.email}</th>
                <th>
                  <button
                    onClick={() => {
                      dispatch(deleteUser(each._id));
                    }}
                  >
                    Delete
                  </button>
                  /
                  <button
                    onClick={() => {
                      userRowEdit(each);
                    }}
                  >
                    Edit
                  </button>
                </th>
              </tr>
            );
          })}
        </table>
      );
    } else {
      return <p>No data is avilable to show here.</p>;
    }
  };

  // console.log(userTable);

  const userLogOut = () => {
    localStorage.removeItem("jwt_Token");
    navigate("/");
  };

  const token = localStorage.getItem("jwt_Token");
  if (!token) {
    return navigate("/");
  }
  return (
    <div className="Table">
      <div className="navbar">
        <Link to="/Form">
          <button>Add User Data</button>
        </Link>
        <button onClick={userLogOut}>Logout</button>
      </div>
      <div>{stateacess()}</div>
    </div>
  );
};

export default Table;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

interface User {
  ID: number;
  username: string;
  role: string;
}

function CustomerList() {
  const [user, setUser] = useState<User[]>([]);
  const accessToken = localStorage.getItem('admin_token');


  useEffect(() => {
    apiFunction();
  }, []);

  const apiFunction = async () => {
    try {
      const response = await axios.get("http://localhost:3000/admin/viewUser", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setUser(response.data);
    }  catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response);
      } else {
        console.error(err);
      }
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="card" style={{ width: "44rem" }}>
        <div className="card-header fs-3 d-flex  justify-content-between align-items-center ">
          <h4 className="">USER LIST</h4>
        <Link to={'/admindashboard'} className="text-decoration-none"><span title="Dashboard"><i className="bi bi-house-fill fs-2 opacity-50"></i></span></Link>
          </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">User ID</th>
              <th scope="col">User Name</th>
              <th scope="col">User Role</th>
            </tr>
          </thead>
          <tbody>
            {user.map((user, index) =>
                user.role !== "admin" && (
                  <tr key={index}>
                    <th scope="row">{user.ID}</th>
                    <td>{user.username}</td>
                    <td>{user.role}</td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CustomerList;

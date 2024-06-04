import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

interface User {
  UBID: number;
  startdate: string;
  enddate: string;
  bookname: { ID: string; bookname: string };
  username: { ID: string; username: string };
}

function BorrowedBooks() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editStartdate, setEditStartdate] = useState<string>("");
  const [editEnddate, setEditEnddate] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const accessToken = localStorage.getItem('admin_token');

  useEffect(() => {
    if (accessToken) {
      getUserBook();
    }
  }, [accessToken]);

  // GET THE DATA OF BOOKNAME, USERNAME, AND START AND ENDDATE
  const getUserBook = async () => {
    try {
      const response = await axios.get("http://localhost:3000/admin/userbooks", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const sortedData = response.data.sort((a: User, b: User) => a.UBID - b.UBID);
      setUsers(sortedData);
    } catch (err) {
      console.log("Error at fetching userbook", err);
    }
  };

  // API FOR DELETE THE USER FROM THE TABLE
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/admin/deleteUB/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("UserBook Data successfully deleted");
      getUserBook();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response);
      } else {
        console.error(err);
      }
    }
  };

  const handleEdit = (index: number | null) => {
    if (index !== null) {
      setEditingIndex(index);
      setEditStartdate(users[index].startdate);
      setEditEnddate(users[index].enddate);
    }
  };

  const handleSave = async (id: number) => {
    try {
      await axios.put(
        `http://localhost:3000/admin/updateUB/${id}`,
        {
          startdate: editStartdate,
          enddate: editEnddate,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        }
      );
      setEditingIndex(null);
      getUserBook();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response);
      } else {
        console.error(err);
      }
    }
  };

  const filteredUsers = users.filter((user) =>
    user.username.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.bookname.bookname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedFilteredUsers = filteredUsers.sort((a, b) => a.UBID - b.UBID);

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Card style={{ width: "70rem" }}>
        <Card.Header className="d-flex justify-content-between align-items-center p-3">
          <h2>Books Taken by User</h2>
          <input
            type="search"
            className="rounded-1 p-1 outline-0 border-primary"
            placeholder="@search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Link to={"/admindashboard"} className="text-decoration-none">
            <span title="Dashboard">
              <i className="bi bi-house-fill fs-2 opacity-50"></i>
            </span>
          </Link>
        </Card.Header>
        <Card.Body>
          <table className="table">
            <thead>
              <tr className="text-uppercase">
                <th scope="col">UB ID</th>
                <th scope="col">User ID</th>
                <th scope="col">Username</th>
                <th scope="col">Book Name</th>
                <th scope="col">Start-Date</th>
                <th scope="col">End-Date</th>
                {editingIndex === null ? (
                  <>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                  </>
                ) : (
                  <>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {sortedFilteredUsers.length ? (
                sortedFilteredUsers.map((user, index) =>
                  editingIndex === index ? (
                    <tr key={index}>
                      <td>{user.UBID}</td>
                      <td>{user.username.ID}</td>
                      <td>{user.username.username}</td>
                      <td>{user.bookname.bookname}</td>
                      <td>
                        <input
                          type="date"
                          value={editStartdate}
                          onChange={(e) => setEditStartdate(e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="date"
                          value={editEnddate}
                          onChange={(e) => setEditEnddate(e.target.value)}
                        />
                      </td>
                      <td>
                        <Button className="btn-success" onClick={() => handleSave(user.UBID)}>
                          Save
                        </Button>
                      </td>
                      <td>
                        <Button className="btn-secondary" onClick={() => setEditingIndex(null)}>
                          Cancel
                        </Button>
                      </td>
                    </tr>
                  ) : (
                    <tr key={index}>
                      <td>{user.UBID}</td>
                      <td>{user.username.ID}</td>
                      <td>{user.username.username}</td>
                      <td>{user.bookname.bookname}</td>
                      <td>{user.startdate}</td>
                      <td>{user.enddate}</td>
                      <td>
                        <Button className="btn-primary" onClick={() => handleEdit(index)}>
                          <i className="bi bi-pencil-square"></i>
                        </Button>
                      </td>
                      <td>
                        <Button className="btn-danger" onClick={() => handleDelete(user.UBID)}>
                          <i className="bi bi-trash3"></i>
                        </Button>
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td colSpan={8} className="text-center p-5">No matches found!</td>
                </tr>
              )}
            </tbody>
          </table>
        </Card.Body>
      </Card>
    </div>
  );
}

export default BorrowedBooks;

import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

interface User {
  UBID: number;
  startdate: string;
  enddate: string;
}

function BorrowedBooks({ accessToken }) {
  const [users, setUsers] = useState<User[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editStartdate, setEditStartdate] = useState<string>("");
  const [editEnddate, setEditEnddate] = useState<string>("");

  useEffect(() => {
    getUserBook();
  }, []);

  const getUserBook = async () => {
    try {
      const response = await axios.get('http://localhost:3000/admin/userbooks', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setUsers(response.data);
    } catch (err) {
      console.log('Error at fetching userbook', err);
    }
  };

  const handleDelete = async (id : number) => {
    try {
      await axios.delete(`http://localhost:3000/admin/deleteUB/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
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
  
  const handleSave = async (id : number) => {
    try {
      await axios.put(`http://localhost:3000/admin/updateUB/${id}`, {
        startdate: editStartdate,
        enddate: editEnddate
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
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

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '70rem' }}>
        <Card.Header className="d-flex justify-content-between align-items-center p-3">
          <h2>User's List</h2>
          <Link to={'/admindashboard'} className="text-decoration-none">
            <span title="Dashboard">
              <i className="bi bi-house-fill fs-2 opacity-50"></i>
            </span>
          </Link>
        </Card.Header>
        <Card.Body>
          <table className="table">
            <thead>
              <tr className="text-uppercase">
                <th scope="col">UserBook ID</th>
                <th scope="col">Start-Date</th>
                <th scope="col">End-Date</th>
                {editingIndex === null ? (
                <> 
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </>
                ):(
                  <>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </>
                )
                }
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                editingIndex === index ? (
                  <tr key={index}>
                    <td>{user.UBID}</td>
                    <td><input type="date" value={editStartdate} onChange={(e) => setEditStartdate(e.target.value)} /></td>
                    <td><input type="date" value={editEnddate} onChange={(e) => setEditEnddate(e.target.value)} /></td>
                    <td><Button className="btn-success" onClick={() => handleSave(user.UBID)}>Save</Button></td>
                    <td><Button className="btn-secondary" onClick={() => setEditingIndex(null)}>Cancel</Button></td>
                  </tr>
                ) : (
                  <tr key={index}>
                    <td>{user.UBID}</td>
                    <td>{user.startdate}</td>
                    <td>{user.enddate}</td>
                    <td><Button className="btn-primary" onClick={() => handleEdit(index)}><i className="bi bi-pencil-square"></i></Button></td>
                    <td><Button className="btn-danger" onClick={() => handleDelete(user.UBID)}><i className="bi bi-trash3"></i></Button></td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        </Card.Body>
      </Card>
    </div>
  );
}

export default BorrowedBooks;

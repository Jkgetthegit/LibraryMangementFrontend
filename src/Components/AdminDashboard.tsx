import { Card, Button } from "react-bootstrap";
import { Link , useNavigate } from "react-router-dom";


function AdminDashboard() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('Atoken');
    navigate('/');
  };


  return (
    <div className="d-flex justify-content-center align-items-center" style={{minHeight:'100vh'}}>
      <Card className="shadow" style={{ width: "80rem", height: "40rem" }}>
        <Card.Header className="d-flex justify-content-between">
          <h2>Dashboard</h2>
          <Button className="bg-transparent text-black border-black" onClick={logout}>
            Logout
          </Button>
        </Card.Header>
        <Card.Body className="d-flex justify-content-center align-items-center flex-row">
          <div className="d-flex row" style={{ gap: "50px" }}>

            <Link to={"/booklist"} className="d-block flex-grow-1 ">
              <Button className="bg-black w-100">
                <h3 className="m-0">Book List</h3>
              </Button>
            </Link>

            <Link to={"/customerlist"} className="d-block flex-grow-1">
              <Button className="bg-black w-100">
                <h3 className="m-0">Customers List</h3>
              </Button>
            </Link>
          
            <Link to={"/borrowedbooks"} className="d-block flex-grow-1">
              <Button className="bg-black w-100">
                <h3 className="m-0">Borrowed Books</h3>
              </Button>
            </Link>

          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AdminDashboard;

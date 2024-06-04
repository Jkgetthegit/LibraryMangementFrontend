import { Card, CardBody, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

interface BorrowedBook {
  startdate: string;
  enddate: string;
  bookname: { ID: number; bookname: string }; 
}

function UserProfile() {
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([]);
  const accessToken : any = localStorage.getItem('user_token')
  const userDetails :any  = jwtDecode(accessToken);
  // console.log(accessToken);
  

  useEffect(() => {
    borrowedBook();
  }, []);

  const borrowedBook = async () => {
    try {
      const response = await axios.get("http://localhost:3000/user/borrowed", {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
      });
      console.log(response.data);
      setBorrowedBooks(
        response.data.filter((book : any ) => book.username.ID === userDetails.id))
    } catch (err : any) {
      console.log(err.response);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card className="w-75">
        <CardBody>
          <Row>
            {/* User Information */}
            <Col md={6}>
              <div className="d-flex justify-content-around align-items-center">
                <div className="position-relative">
                  <i
                    className="bi bi-person-circle bg-white text-secondary"
                    style={{ fontSize: "120px" }}
                  ></i>
                </div>
              </div>
              <table className="d-flex justify-content-center align-items-center  fs-5 mt-4 flex-column" style={{width:'100%'}}>
                <div className="p-1" style={{width:'300px'}}>
                <tr className="d-flex justify-content-between ">
                  <th className="text-left" >UserID :</th>
                  <td className="text-right">{userDetails.id}</td>
                </tr>
                <tr className="d-flex justify-content-between">
                  <th className="text-left">UserName :</th>
                  <td className="text-right">{userDetails.name}</td>
                </tr>
                <tr className="d-flex justify-content-between">
                  <th className="text-left">Role :</th>
                  <td className="text-left">{userDetails.role}</td>
                </tr>
                </div>
              </table>
              <div className="text-center mt-4 ml-0">
            <Link to={"/userdashboard"}>
              <Button>Back to Home</Button>
            </Link>
          </div>
            </Col>

            {/* Borrowed Books */}
            <Col md={6} style={{ maxHeight: '420px', overflowY: 'auto' }}>
              <h5 className="text-center text-primary">Books You borrowed !!</h5>
              {borrowedBooks.map((book, index) => (
                <Card key={index} className="mb-3" >
                  <CardBody>
                    <h5>{book.bookname.bookname}</h5>
                    <p>Book ID: {book.bookname.ID}</p>
                    <p>Start Date: {book.startdate}</p>
                    <p>End Date: {book.enddate}</p>
                  </CardBody>
                </Card>
              ))}
            </Col>
          </Row>

          
        </CardBody>
      </Card>
    </div>
  );
}

export default UserProfile;

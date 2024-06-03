import { Card, CardBody } from "react-bootstrap";
import {Button} from 'react-bootstrap'
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface UserProfileProps<T> {
  token: T;
}

function UserProfile<T>({ token }: UserProfileProps<T>) {
  const userDetails = jwtDecode(token);

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '20rem' }}>
        <CardBody>
          <div className="d-flex justify-content-around align-items-center">
            <div className="position-relative" style={{ marginTop: '-100px' }}>
              <i className="bi bi-person-circle bg-white text-secondary" style={{ fontSize: '120px' }}></i>
            </div>
          </div>
          <div className="d-flex justify-content-around">
            <label className="text-left">UserID :</label>
            <label className="text-right">{userDetails.id}</label>
          </div>
          <div className="d-flex justify-content-around">
            <label className="text-left">UserName :</label>
            <label className="text-left">{userDetails.name}</label>
          </div>
          <div className="d-flex justify-content-around">
            <label className="text-left">Role :</label>
            <label className="text-left">{userDetails.role}</label>
          </div>

          <div className="text-center mt-4">
            <Link to={'/userdashboard'}>
            <Button>Back to Home</Button>
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default UserProfile;



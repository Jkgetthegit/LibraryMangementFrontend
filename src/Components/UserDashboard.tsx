import { Card, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function UserDashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('Utoken');
    navigate('/');
  };

  return (
    <div className='d-flex justify-content-center align-items-center' style={{ minHeight: '100vh' }}>
      <Card className='shadow' style={{ width: '80rem', height: '40rem' }}>
        <Card.Header className='d-flex justify-content-between'>
          <h2>Dashboard</h2>
          <Button className='bg-transparent text-black border-black' onClick={logout}>Logout</Button>
        </Card.Header>
        <Card.Body className='d-flex justify-content-center align-items-center flex-row'>
          <div className='d-flex row' style={{ gap: '30px' }}>
            <Link to={'/bookdetails'} className='d-block flex-grow-1'> 
              <Button className='bg-black w-100'><h3 className="m-0 text-white">View Books</h3></Button> 
            </Link>
            <Link to={'/userprofile'} className='d-block flex-grow-1'>
              <Button className='bg-black w-100'><h3 className="m-0 text-white">Profile</h3></Button> 
            </Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default UserDashboard;

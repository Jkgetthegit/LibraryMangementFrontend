import { Card, Button, Col, Row, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link ,useNavigate  } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface Book {
  ID: number;
  bookname: string;
}

function BookDetails() {

  const [books,setBooks] = useState<Book[]>([]);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('user_token')


  console.log(accessToken);
  
  useEffect(()=>{
    apiFunction();
  },[])

  const apiFunction = async() =>{
    try{

      const response = await axios.get('http://localhost:3000/user/books',{
        headers: {
          Authorization : `Bearer ${accessToken}`
        }
      })
      setBooks(response.data);
      console.log(response.data);
    }catch(err){
      console.log(err);
      
    }
  }


  const logout = () => {
    localStorage.removeItem('Utoken');
    navigate('/');
  };



  return (
    <div className='d-flex justify-content-center align-items-center' style={{ minHeight: '100vh', padding: '8rem' }}>
      <Card className='shadow' style={{ width: '80rem' }}>
        <Card.Header className='d-flex justify-content-between align-items-center'>
          <h2>BookDetails</h2>
          <div  className='d-flex ' style={{gap:'20px'}} >
          <Link to={'/userdashboard'} className="text-decoration-none"><span title="Dashboard"><i className="bi bi-house-fill fs-2 opacity-50"></i></span></Link>
          <Button className='bg-transparent text-black border-black' title='logout' onClick={logout}>Logout</Button>
          </div>
        </Card.Header>
        <Card.Body>
          <Row xs={1} md={2} lg={3} className='g-4' style={{ maxHeight: '600px', overflowY: 'auto' }}>
            {books.map((book, index) => (
              <Col key={index}>
                <Card>
                  <Card.Body>
                    <p><strong>Book ID : </strong>{book.ID}</p>
                    <p><strong>Book Name : </strong>{book.bookname}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
      <Link to={'/borrowbook'}>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="tooltip-top">Click to Borrow the book what you want !!</Tooltip>}>
          <Button className='position-absolute fs-5' style={{ bottom: '20px', right: '20px' }}>Borrow</Button>
        </OverlayTrigger>
      </Link>
    </div>
  );
}

export default BookDetails;

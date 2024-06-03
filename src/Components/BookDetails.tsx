import { Card, Button, Col, Row, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface Book {
  ID: number;
  bookname: string;
}

function BookDetails({accessToken}) {

  const [books,setBooks] = useState<Book[]>([]);

  console.log(accessToken);
  
  useEffect(()=>{
    apiFunction();
  },[accessToken])

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


  return (
    <div className='d-flex justify-content-center align-items-center' style={{ minHeight: '100vh', padding: '8rem' }}>
      <Card className='shadow' style={{ width: '80rem' }}>
        <Card.Header className='d-flex justify-content-between'>
          <h2>BookDetails</h2>
          <Button className='bg-transparent text-black border-black' title='logout'>Logout</Button>
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

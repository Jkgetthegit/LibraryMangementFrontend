import { useState, useEffect } from "react";
import { Card, Button, CardBody, Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

interface Book {
  ID: number;
  bookname: string;
}

function BorrowBook() {
  const [username, setUserName] = useState('');
  const [bookname, setBookName] = useState('');
  const [startdate, setStartDate] = useState('');
  const [enddate, setEndDate] = useState('');
  const [showError, setShowError] = useState(false);
  const [bookSuggestions, setBookSuggestions] = useState<Book[]>([]);
  const accessToken = localStorage.getItem('user_token');
  
  useEffect(() => {
    const fetchBookSuggestions = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user/books', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        setBookSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching book suggestions:", error);
      }
    };

    fetchBookSuggestions();
  }, [accessToken]);

  const apiFunction = async (username: string, bookname: string, startdate: string, enddate: string) => {
    try {
      await axios.post("http://localhost:3000/user/borrow", 
        {
          username,
          bookname,
          startdate,
          enddate
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      console.log("Data posted successfully");
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error at posting data:", err.message);
      } else if (axios.isAxiosError(err)) {
        console.error("Error at posting data:", err.response ? err.response.data : err.message);
      } else {
        console.error("Unknown error:", err);
      }
    }
  };

  const ToastSuccess = () => {
    toast.success("Book Register Successful", { 
      autoClose: 3000
    });
  };

  const ToastAlert = () => {
    toast.error("Book Register Unsuccessful", { 
      autoClose: 3000
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (bookname === '' || username === '' || startdate === '' || enddate === '') {
      setShowError(true);
    } else {
      setShowError(false);
      try {
        await apiFunction(username, bookname, startdate, enddate);
        ToastSuccess();
        setBookName('');
        setEndDate('');
        setUserName('');
        setStartDate('');
      } catch (err) {
        console.log(err);
        ToastAlert();
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '25rem' }}>
        <Card.Header className="d-flex justify-content-between">
          <h5 className="text-center" style={{ textTransform: 'uppercase' }}>Give the Details</h5>
          <Link to={'/userdashboard'} className="text-decoration-none"><span title="Dashboard"><i className="bi bi-house-fill fs-5 opacity-50"></i></span></Link>
        </Card.Header>
        <CardBody>
          {showError && (
            <Alert variant="danger">
              Please fill all of the fields
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="bookId" className="mb-3">
              <Form.Label style={{ fontWeight: '600' }}>Username</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter username" 
                value={username}
                onChange={(e) => setUserName(e.target.value)} 
              />
            </Form.Group>

            <Form.Group controlId="bookName" className="mb-3">
              <Form.Label style={{ fontWeight: '600' }}>Book Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter Book Name" 
                value={bookname} 
                onChange={(e) => setBookName(e.target.value)} 
                list="books" 
              />
              <datalist id="books">
                {bookSuggestions.map((book, index) => (
                  <option key={index} value={book.bookname} />
                ))}
              </datalist>
            </Form.Group>

            <Form.Group controlId="startdate" className="mb-3">
              <Form.Label style={{ fontWeight: '600' }}>Start-Date</Form.Label>
              <Form.Control 
                type="date" 
                placeholder="Enter Start Date" 
                value={startdate}
                onChange={(e) => setStartDate(e.target.value)} 
              />
            </Form.Group>
            
            <Form.Group controlId="enddate" className="mb-3">
              <Form.Label style={{ fontWeight: '600' }}>End-Date</Form.Label>
              <Form.Control 
                type="date" 
                placeholder="Enter End Date" 
                value={enddate}
                onChange={(e) => setEndDate(e.target.value)} 
              />
            </Form.Group>

            <div className="text-center py-2 mt-2">
              <Button className="btn btn-primary-opacity-5" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}

export default BorrowBook;

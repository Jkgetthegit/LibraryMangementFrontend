import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Book {
  ID: number;
  bookname: string;
}

function BookList() {
  // State variables
  const [books, setBooks] = useState<Book[]>([]);
  const [bookname, setBookname] = useState(""); 
  const accessToken = localStorage.getItem('admin_token');

  useEffect(() => {
    getBookApi();
  }, [accessToken]); 

  const getBookApi = async () => {
    try {
      const response = await axios.get('http://localhost:3000/admin/show', {
        headers: {  
          Authorization : `Bearer ${accessToken}`
        }
      });
      setBooks(response.data);
    }  catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response);
      } else {
        console.error(err);
      }
    }
  }

  const addBookApi = async (bookname : string) => {
    try {
      await axios.post(
        'http://localhost:3000/admin/createBook',
        { bookname },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      setBookname('');
      console.log('Book added successfully');
      getBookApi();
    } catch (err: unknown) {
  if (err instanceof Error) {
    console.error("Error at adding data:", err.message);
  } else if (axios.isAxiosError(err)) {
    console.error("Error at posting data:", err.response ? err.response.data : err.message);
  } else {
    console.error("Unknown error:", err);
  }
}

  };
  
  const deleteBookApi = async (ID : number) => {
    console.log(ID);
    
    try {
      await axios.delete(`http://localhost:3000/admin/deleteBook/${ID}`, {
        headers: { 
          Authorization: `Bearer ${accessToken}`
        }
      });
      console.log("Book Deleted Successfully");
      getBookApi();
    }  catch (err) {
      if (axios.isAxiosError(err)) {
        console.log('Axios Error occur while deleting delete book api',err.response);
      } else {
        console.error('Error occur while deleting delete book api',err);
      }
    }
  }
  

  
  return (
    <div className="d-flex justify-content-center align-items-center" style={{minHeight:'100vh'}}>
      <Card style={{width:'80rem'}}>
        <Card.Header className="d-flex  justify-content-between align-items-center p-3">
          <h2>Book List</h2>
          <Link to={'/admindashboard'} className="text-decoration-none">
            <span title="Dashboard">
              <i className="bi bi-house-fill fs-2 opacity-50"></i>
            </span>
          </Link>
        </Card.Header>
        <Card.Body>
          <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
            <ul className="list-group">
              {books.map(book => (
                <li key={book.ID} className="list-group-item d-flex justify-content-between align-items-center">
                  <div className='w-100 d-flex justify-content-between'>
                    <span>{book.ID} . {book.bookname}</span>
                    <div>
                      <button className="btn btn-outline-danger" onClick={() => deleteBookApi(book.ID)}>Delete</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="d-flex mt-4" style={{gap:'10px'}}>
            <input
              type="text"
              className="form-control d-inline-block border-1 border-secondary "
              placeholder="Enter book name"
              value={bookname}
              onChange={(e) => setBookname(e.target.value)}
            />
            <button className="btn btn-primary" onClick={() => addBookApi(bookname)}>Add Book</button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default BookList;

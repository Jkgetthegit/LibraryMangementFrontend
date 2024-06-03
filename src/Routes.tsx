import { BrowserRouter, Route, Routes as Router } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import UserDashboard from "./Components/UserDashboard";
import BookDetails from "./Components/BookDetails";
import BorrowBook from "./Components/BorrowBook";
import UserProfile from "./Components/UserProfile";
import AdminDashboard from "./Components/AdminDashboard";
import BookList from "./Components/BookList";
import CustomerList from "./Components/CustomerList";
import BorrwedBooks from "./Components/BorrwedBooks";

function Routes() {
  const user_token = localStorage.getItem('user_token');
  const admin_token = localStorage.getItem('admin_token');

  return (
    <div>
      <BrowserRouter>
        <Router>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userdashboard" element={<UserDashboard  />} />
          <Route path="/bookdetails" element={<BookDetails accessToken  = {user_token}/>} />
          <Route path="/userprofile" element={<UserProfile token = {user_token} />} />
          <Route path="/borrowbook" element={<BorrowBook accessToken  = {user_token}/>} />
          {/* adminroutes */}
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/booklist" element={<BookList accessToken  = {admin_token}/>} />
          <Route path="/customerlist" element={<CustomerList accessToken  = {admin_token}/>} />
          <Route path="/borrowedbooks" element={<BorrwedBooks accessToken  = {admin_token}/>} />
        </Router>
      </BrowserRouter>
    </div>
  );
}

export default Routes;

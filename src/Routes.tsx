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
import UserProtectedRoute from "./Components/UserProtectedRoute";
import AdminProtectedRoute from "./Components/AdminProtectedRoute";

function Routes() {
  const user_token = localStorage.getItem("user_token");
  const admin_token = localStorage.getItem("admin_token");

  console.log(user_token);
  console.log(admin_token);

  return (
    <div>
      <BrowserRouter>
        <Router>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/userdashboard"
            element={
              <UserProtectedRoute>
                <UserDashboard />
              </UserProtectedRoute>
            }
          />

          <Route
            path="/bookdetails"
            element={
              <UserProtectedRoute>
                <BookDetails />
              </UserProtectedRoute>
            }
          />

          <Route
            path="/userprofile"
            element={
              <UserProtectedRoute>
                <UserProfile />
              </UserProtectedRoute>
            }
          />

          <Route
            path="/borrowbook"
            element={
              <UserProtectedRoute>
                <BorrowBook />
              </UserProtectedRoute>
            }
          />

          {/* adminroutes */}
          <Route
            path="/admindashboard"
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/booklist"
            element={
              <AdminProtectedRoute>
                <BookList/>
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/customerlist"
            element={
              <AdminProtectedRoute>
                <CustomerList  />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/borrowedbooks"
            element={
              <AdminProtectedRoute>
                <BorrwedBooks  />
              </AdminProtectedRoute>
            }
          />
        </Router>
      </BrowserRouter>
    </div>
  );
}

export default Routes;

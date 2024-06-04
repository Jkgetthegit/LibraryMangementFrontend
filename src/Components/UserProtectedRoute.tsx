import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UserProtectedRoute({ children }: { children: JSX.Element }) {
       const navigate = useNavigate();
      const Utoken = localStorage.getItem("user_token");
    //    console.log("TEST", token);
      if (Utoken) return children;
      useEffect(() => {
        navigate("/");
      });
}

export default UserProtectedRoute

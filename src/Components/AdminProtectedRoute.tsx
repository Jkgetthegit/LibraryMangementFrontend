import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function AdminProtectedRoute({ children }: { children: JSX.Element }) {
    const navigate = useNavigate();
    const Atoken = localStorage.getItem("admin_token");
  //    console.log("TEST", token);
    if (Atoken) return children;
    useEffect(() => {
      navigate("/");
    });
}

export default AdminProtectedRoute

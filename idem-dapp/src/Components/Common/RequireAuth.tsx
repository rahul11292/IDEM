;
import {  useLocation, Navigate } from 'react-router-dom';


export function RequireAuth({ children }: { children: JSX.Element }) {
    let auth = localStorage.getItem("userId");
    let location = useLocation();
  
    if (!auth) {
      return <Navigate to="/" state={{ from: location.pathname }} replace />;
    }
  
    return children;
  }

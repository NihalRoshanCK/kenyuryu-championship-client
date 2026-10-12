import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function AdminProtectedRoute({ children }: ProtectedRouteProps): JSX.Element {
  let adminDetails = localStorage.getItem("admin");
  
  if (adminDetails) {
    const details = JSON.parse(adminDetails);
    const admin = (details?.access && details?.user?.is_staff) || false;
    return admin ? <>{children}</> : <Navigate to="/auth/signin" />;
  } 
  
  // return  <>{children}</>
  return <Navigate to="/auth/signin" />;
}

export default AdminProtectedRoute;

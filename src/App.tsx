import { Suspense, lazy, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import ECommerce from './pages/Dashboard/ECommerce';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import { PrintInvoice } from './pages/Authentication/SignIn copy';
import Loader from './common/Loader';
import routes from './routes';
import AdminDashBoard from './pages/Dashboard/AdminDashBoard';
import ClubDetails from './pages/Dashboard/ClubDetails';
import AllregistrationsPage from './pages/Dashboard/Allregistration';
import ProtectedRoute from './pages/Authentication/ProtectedRoute';
import AdminProtectedRoute from './pages/Authentication/AdminProtectedRoute';
import AllCandidateDetails from './components/AllCandidateDetails';

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
      <Routes>
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/auth/admin/signin" element={<Navigate to="/auth/signin" replace />} />

        <Route path="/check" element={<AdminProtectedRoute><PrintInvoice /></AdminProtectedRoute>} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <ECommerce />
            </ProtectedRoute>
          }
        ></Route>
        <Route element={<DefaultLayout />}>
          <Route
            index
            element={
              <AdminProtectedRoute>
                <AdminDashBoard />
              </AdminProtectedRoute>
            }
          />

          <Route path="/allregistrations" element={<AdminProtectedRoute><AllregistrationsPage /></AdminProtectedRoute>} />
          <Route path="/clubdetails" element={<AdminProtectedRoute><ClubDetails /></AdminProtectedRoute>} />
          <Route path="/allcandidatedetails" element={<AdminProtectedRoute><AllCandidateDetails/></AdminProtectedRoute>} />
          {routes.map((routes, index) => {
            const { path, component: Component } = routes;
            return (
              <Route
                key={index}
                path={path}
                element={
                  <Suspense fallback={<Loader />}>
                    <Component />
                  </Suspense>
                }
              />
            );
          })}
        </Route>
      </Routes>
    </>
  );
}

export default App;

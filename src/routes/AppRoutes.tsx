import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/DashboardPage";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import Layout from "../components/Layout";
import Customers from "../pages/Customers/CustomersPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import CustomersEdit from "../pages/Customers/CustomersEditPage";
import CustomersAdd from "../pages/Customers/CustomersAddPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route path="/register"
        element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        }
      />

      {/* Protected routes */}
      <Route path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route path="/customers"
        element={
          <ProtectedRoute>
            <Layout>
              <Customers />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route path="/customers/:id"
        element={
          <ProtectedRoute>
            <Layout>
              <CustomersEdit />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route path="/customers/add"
        element={
          <ProtectedRoute>
            <Layout>
              <CustomersAdd />
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;

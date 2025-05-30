import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/DashboardPage";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import Layout from "../components/Layout";
import RegisterPage from "../pages/auth/RegisterPage";
import LoginPage from "../pages/auth/LoginPage";
import Customers from "../pages/user/customers/CustomersPage";
import CustomersEdit from "../pages/user/customers/CustomersEditPage";
import CustomersAdd from "../pages/user/customers/CustomersAddPage";

import Suppliers from "../pages/user/suppliers/SuppliersPage";
import SuppliersEdit from "../pages/user/suppliers/SuppliersEditPage";
import SuppliersAdd from "../pages/user/suppliers/SuppliersAddPage";

import Salesmans from "../pages/user/salesmans/SalesmansPage";
import SalesmansEdit from "../pages/user/salesmans/SalesmansEditPage";
import SalesmansAdd from "../pages/user/salesmans/SalesmansAddPage";

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
      {/* Users Management: Customers */}
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
      {/* Users Management: Customers */}
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
      {/* Users Management: Suppliers */}
      <Route path="/suppliers"
        element={
          <ProtectedRoute>
            <Layout>
              <Suppliers />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route path="/suppliers/:id"
        element={
          <ProtectedRoute>
            <Layout>
              <SuppliersEdit />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route path="/suppliers/add"
        element={
          <ProtectedRoute>
            <Layout>
              <SuppliersAdd />
            </Layout>
          </ProtectedRoute>
        }
      />
      {/* Users Management: Salesmans */}
      <Route path="/salesmans"
        element={
          <ProtectedRoute>
            <Layout>
              <Salesmans />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route path="/salesmans/:id"
        element={
          <ProtectedRoute>
            <Layout>
              <SalesmansEdit />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route path="/salesmans/add"
        element={
          <ProtectedRoute>
            <Layout>
              <SalesmansAdd />
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;

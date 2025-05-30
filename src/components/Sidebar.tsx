import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Sidebar = () => {
  const { user } = useAuth();
  const userArr = JSON.parse(user ?? "");
  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        <li className="nav-item nav-profile">
          <Link to="#" className="nav-link">
            <div className="nav-profile-image">
              <img src={userArr.image} alt="profile" />
              <span className="login-status online"></span>
            </div>
            <div className="nav-profile-text d-flex flex-column">
              <span className="font-weight-bold mb-2">{userArr.name}</span>
              {/* <span className="text-secondary text-small">Project Manager</span> */}
            </div>
            <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            <span className="menu-title">Dashboard</span>
            <i className="mdi mdi-home menu-icon"></i>
          </Link>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-bs-toggle="collapse" href="#users_management" aria-expanded="false" aria-controls="users_management">
            <span className="menu-title">Users Management</span>
            <i className="menu-arrow"></i>
            <i className="mdi mdi-account-group menu-icon"></i>
          </a>
          <div className="collapse" id="users_management">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                <Link className="nav-link" to="/customers">Customers</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/suppliers">Supplier</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/salesmans">Salesman</Link>
              </li>
            </ul>
          </div>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-bs-toggle="collapse" href="#products_management" aria-expanded="false" aria-controls="products_management">
            <span className="menu-title">Products Management</span>
            <i className="menu-arrow"></i>
            <i className="mdi mdi-tag-multiple menu-icon"></i>
          </a>
          <div className="collapse" id="products_management">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                <Link className="nav-link" to="/salesmans">Manufacturing Company</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/customers">Category</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/suppliers">Product</Link>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
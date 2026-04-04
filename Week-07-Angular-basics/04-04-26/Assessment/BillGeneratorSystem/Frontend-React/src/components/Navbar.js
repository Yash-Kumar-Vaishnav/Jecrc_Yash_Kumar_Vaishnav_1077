import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaFileInvoice, FaHistory, FaList, FaChartBar } from 'react-icons/fa';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <h1>💼 Bill Generator System</h1>
      <ul className="nav-links">
        <li>
          <Link to="/" className={isActive('/') ? 'active' : ''}>
            <FaFileInvoice /> Create Bill
          </Link>
        </li>
        <li>
          <Link to="/history" className={isActive('/history') ? 'active' : ''}>
            <FaHistory /> History
          </Link>
        </li>
        <li>
          <Link to="/catalog" className={isActive('/catalog') ? 'active' : ''}>
            <FaList /> Catalog
          </Link>
        </li>
        <li>
          <Link to="/reports" className={isActive('/reports') ? 'active' : ''}>
            <FaChartBar /> Reports
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
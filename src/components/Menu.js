// Menu.js

import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/suppliers">Suppliers</Link>
        </li>
        <li>
          <Link to="/stocks">Stocks</Link>
        </li>
        <li>
          <Link to="/sales">Sales</Link>
        </li>
        <li>
          <Link to="/customers">Customers</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;

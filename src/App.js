import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Dashboard';
import ProductList from './pages/Product/Index';
import SupplierList from './pages/Supplier/Index';
import StockList from './pages/Stock/Index';
import SaleList from './pages/Sale/Index';
import CustomerList from './pages/Customer/Index';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ProductList />} />
          <Route path="suppliers" element={<SupplierList />} />
          <Route path="stocks" element={<StockList />} />
          <Route path="sales" element={<SaleList />} />
          <Route path="customers" element={<CustomerList />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;

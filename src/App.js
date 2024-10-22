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
import CategoryList from './pages/Category/Index';
import TagList from './pages/Tag/Index';
import CustomerList from './pages/Customer/Index';
import ViewCustomer from './pages/Customer/ViewCustomer';
import EditCustomer from './pages/Customer/EditCustomer';
import CreateCustomer from './pages/Customer/CreateCustomer';
import ViewCategory from './pages/Category/ViewCategory';
import EditCategory from './pages/Category/EditCategory';
import CreateCategory from './pages/Category/CreateCategory';

import ViewTag from './pages/Tag/ViewTag';
import EditTag from './pages/Tag/EditTag';
import CreateTag from './pages/Tag/CreateTag';
import NotFound from './components/NotFound';

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
          <Route path="/customers/:id" element={<ViewCustomer />} />
          <Route path="/customers/edit/:id" element={<EditCustomer />} />
          <Route path="/customers/create" element={<CreateCustomer />} />

      
          <Route path="categories" element={<CategoryList />} />
          <Route path="/categories/:id" element={<ViewCategory />} />
          <Route path="/categories/edit/:id" element={<EditCategory />} />
          <Route path="/categories/create" element={<CreateCategory />} />

          <Route path="tags" element={<TagList />} />
          <Route path="/tags/:id" element={<ViewTag />} />
          <Route path="/tags/edit/:id" element={<EditTag />} />
          <Route path="/tags/create" element={<CreateTag />} />

          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;

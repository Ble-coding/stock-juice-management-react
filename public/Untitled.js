import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();
  const defaultToken = 'ABCDef1345';

  useEffect(() => {
    const token = sessionStorage.getItem('token') || defaultToken;

    if (!token) {
      navigate('/login');
      return;
    }

    const storedCustomers = sessionStorage.getItem('customers');
    if (storedCustomers) {
      setCustomers(JSON.parse(storedCustomers));
    } else {
      fetchCustomers();
    }

    console.log('Customers from session storage:', storedCustomers);
  }, [navigate]);

  const fetchCustomers = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/customers', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch customers');
      }
      const data = await response.json();
      setCustomers(data);
      sessionStorage.setItem('customers', JSON.stringify(data));
      console.log('Fetched customers:', data);
    } catch (error) {
      console.error('There was an error fetching the customers!', error);
    }
  };

  useEffect(() => {
    if (customers.length > 0) {
      // Use window.$ to access jQuery loaded via CDN
      window.$('#customerTable').DataTable({
        dom: 'Bfrtip',
        buttons: [
          'copy', 'csv', 'excel', 'pdf', 'print'
        ]
      });
    }
  }, [customers]);

  return (
    <div>
      <h2>Customers</h2>
      <div className="nk-block nk-block-lg">
        <div className="nk-block-head">
          <div className="nk-block-head-content">
            <h4 className="nk-block-title">Data Table with Export</h4>
            <div className="nk-block-des">
              <p>To initialize datatable with export buttons, use <code className="code-class">.datatable-init-export</code> with <code>table</code> element. <br /> <strong className="text-dark">Please Note</strong> By default export libraries is not added globally, so please include <code className="code-class">"js/libs/datatable-btns.js"</code> into your page to activate export buttons.</p>
            </div>
          </div>
        </div>
        <div className="card card-bordered card-preview">
          <div className="card-inner">
            <table id="customerTable" 
               className="display datatable-init-export nowrap table" data-export-title="Export">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Tel</th>
                  <th>Adresse</th>
                </tr>
              </thead>
              <tbody>
                {customers.map(customer => (
                  <tr key={customer.id}>
                    <td>{customer.id}</td>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerList;

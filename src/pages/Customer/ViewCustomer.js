import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ViewCustomer = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/customers/${id}`);
        if (!response.ok) throw new Error('Failed to fetch customer');
        const data = await response.json();
        setCustomer(data);
      } catch (error) {
        console.error('Error fetching customer:', error);
      }
    };

    fetchCustomer();
  }, [id]);

  if (!customer) return <p>Loading...</p>;

  return (
    <div>
      <h2>Customer Details</h2>
      <p><strong>Name:</strong> {customer.name}</p>
      <p><strong>Email:</strong> {customer.email}</p>
      <p><strong>Phone:</strong> {customer.phone}</p>
      <p><strong>Created At:</strong> {new Date(customer.created_at).toLocaleDateString()}</p>
      <button onClick={() => navigate('/customers')}>Back to List</button>
    </div>
  );
};

export default ViewCustomer;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditCustomer = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
  });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/api/customers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customer),
      });
      if (!response.ok) throw new Error('Failed to update customer');
      navigate('/customers');
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  return (
    <div>
      <h2>Edit Customer</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={customer.name}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={customer.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Phone:
          <input
            type="text"
            name="phone"
            value={customer.phone}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Save Changes</button>
        <button type="button" onClick={() => navigate('/customers')}>Cancel</button>
      </form>
    </div>
  );
};

export default EditCustomer;

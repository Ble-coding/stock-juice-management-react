import React, { useState, useEffect } from 'react';

const Edit = ({ product = {}, onSave }) => {
  const [formData, setFormData] = useState({
    id: product.id || null,
    name: product.name || '',
    description: product.description || '',
    price: product.price || '',
    stock_quantity: product.stock_quantity || '',
    user_id: product.user_id || '',
  });

  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id || null,
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        stock_quantity: product.stock_quantity || '',
        user_id: product.user_id || '',
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Description:</label>
        <input type="text" name="description" value={formData.description} onChange={handleChange} />
      </div>
      <div>
        <label>Price:</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} required />
      </div>
      <div>
        <label>Stock Quantity:</label>
        <input type="number" name="stock_quantity" value={formData.stock_quantity} onChange={handleChange} required />
      </div>
      <div>
        <label>User ID:</label>
        <input type="number" name="user_id" value={formData.user_id} onChange={handleChange} />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default Edit;

import React from 'react';

const Show = ({ product, onEdit, onDelete }) => {
  return (
    <div>
      <span>{product.name} - {product.description} - {product.price} - {product.stock_quantity}</span>
      <button onClick={() => onEdit(product)}>Edit</button>
      <button onClick={() => onDelete(product.id)}>Delete</button>
    </div>
  );
};

export default Show;

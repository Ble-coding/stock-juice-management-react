import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importez useNavigate pour gérer la redirection
import Show from './Show';
import Edit from './Edit';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate(); // Initialisez useNavigate pour la gestion de la redirection

  useEffect(() => {
    const token = sessionStorage.getItem('token'); // Vérifiez la présence du token dans sessionStorage

    if (!token) {
      // Si le token n'est pas présent, redirigez l'utilisateur vers la page de connexion
      navigate('/login'); // Assurez-vous que '/login' correspond au chemin de votre page de connexion
      return; // Arrêtez l'exécution de useEffect
    }

    const storedProducts = sessionStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      fetchProducts(); // Appel à la fonction fetchProducts pour récupérer les produits depuis l'API
    }
  }, [navigate]); // Ajoutez navigate comme dépendance pour que useEffect s'exécute à chaque changement de l'historique

  useEffect(() => {
    sessionStorage.setItem('products', JSON.stringify(products)); // Stockez les produits dans sessionStorage chaque fois qu'ils sont mis à jour
  }, [products]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/products', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`, // Ajoutez le token d'authentification dans les headers de la requête
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data); // Mettez à jour l'état des produits avec les données récupérées depuis l'API
    } catch (error) {
      console.error('There was an error fetching the products!', error);
    }
  };

  const handleCreateProduct = async (product) => {
    try {
      const response = await fetch('http://localhost:8000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`, // Ajoutez le token d'authentification dans les headers de la requête
        },
        body: JSON.stringify(product),
      });
      if (!response.ok) {
        throw new Error('Failed to create product');
      }
      const newProduct = await response.json();
      setProducts([...products, newProduct]);
    } catch (error) {
      console.error('There was an error creating the product!', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`, // Ajoutez le token d'authentification dans les headers de la requête
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error('There was an error deleting the product!', error);
    }
  };

  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setIsEditing(true);
  };

  const handleUpdateProduct = async (product) => {
    try {
      const response = await fetch(`http://localhost:8000/api/products/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`, // Ajoutez le token d'authentification dans les headers de la requête
        },
        body: JSON.stringify(product),
      });
      if (!response.ok) {
        throw new Error('Failed to update product');
      }
      const updatedProduct = await response.json();
      setProducts(products.map(p => (p.id === product.id ? updatedProduct : p)));
      setIsEditing(false);
      setCurrentProduct(null);
    } catch (error) {
      console.error('There was an error updating the product!', error);
    }
  };

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <Show product={product} onEdit={handleEditProduct} onDelete={handleDeleteProduct} />
          </li>
        ))}
      </ul>
      {isEditing ? (
        <Edit product={currentProduct} onSave={handleUpdateProduct} />
      ) : (
        <Edit onSave={handleCreateProduct} />
      )}
    </div>
  );
};

export default ProductList;

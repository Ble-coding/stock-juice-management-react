import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importez useNavigate pour gérer la redirection

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const navigate = useNavigate(); // Initialisez useNavigate pour la gestion de la redirection

  useEffect(() => {
    const token = sessionStorage.getItem('token'); // Vérifiez la présence du token dans sessionStorage

    if (!token) {
      // Si le token n'est pas présent, redirigez l'utilisateur vers la page de connexion
      navigate('/login'); // Assurez-vous que '/login' correspond au chemin de votre page de connexion
      return; // Arrêtez l'exécution de useEffect
    }

    const storedSuppliers = sessionStorage.getItem('suppliers');
    if (storedSuppliers) {
      setSuppliers(JSON.parse(storedSuppliers));
    } else {
      fetchSuppliers();
    }
  }, [navigate]); // Ajoutez navigate comme dépendance pour que useEffect s'exécute à chaque changement de l'historique

  const fetchSuppliers = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/suppliers', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`, // Ajoutez le token d'authentification dans les headers de la requête
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch suppliers');
      }
      const data = await response.json();
      setSuppliers(data);
      sessionStorage.setItem('suppliers', JSON.stringify(data));
    } catch (error) {
      console.error('There was an error fetching the suppliers!', error);
    }
  };

  return (
    <div>
      <h2>Suppliers</h2>
      <ul>
        {suppliers.map(supplier => (
          <li key={supplier.id}>
            {/* Affichez les détails du fournisseur ici */}
            {supplier.name} - {supplier.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SupplierList;

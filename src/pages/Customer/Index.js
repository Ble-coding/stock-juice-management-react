import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importez useNavigate pour gérer la redirection

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate(); // Initialisez useNavigate pour la gestion de la redirection

  useEffect(() => {
    const token = sessionStorage.getItem('token'); // Vérifiez la présence du token dans sessionStorage

    if (!token) {
      // Si le token n'est pas présent, redirigez l'utilisateur vers la page de connexion
      navigate('/login'); // Assurez-vous que '/login' correspond au chemin de votre page de connexion
      return; // Arrêtez l'exécution de useEffect
    }

    const storedCustomers = sessionStorage.getItem('customers');
    if (storedCustomers) {
      setCustomers(JSON.parse(storedCustomers));
    } else {
      fetchCustomers();
    }
  }, [navigate]); // Ajoutez navigate comme dépendance pour que useEffect s'exécute à chaque changement de l'historique

  const fetchCustomers = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/customers', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`, // Ajoutez le token d'authentification dans les headers de la requête
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch customers');
      }
      const data = await response.json();
      setCustomers(data);
      sessionStorage.setItem('customers', JSON.stringify(data));
    } catch (error) {
      console.error('There was an error fetching the customers!', error);
    }
  };

  return (
    <div>
      <h2>Customers</h2>
      <ul>
        {customers.map(customer => (
          <li key={customer.id}>
            {/* Affichez les détails du client ici */}
            {customer.name} - {customer.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerList;

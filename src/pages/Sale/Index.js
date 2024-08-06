import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importez useNavigate pour gérer la redirection

const SaleList = () => {
  const [sales, setSales] = useState([]);
  const navigate = useNavigate(); // Initialisez useNavigate pour la gestion de la redirection

  useEffect(() => {
    const token = sessionStorage.getItem('token'); // Vérifiez la présence du token dans sessionStorage

    if (!token) {
      // Si le token n'est pas présent, redirigez l'utilisateur vers la page de connexion
      navigate('/login'); // Assurez-vous que '/login' correspond au chemin de votre page de connexion
      return; // Arrêtez l'exécution de useEffect
    }

    const storedSales = sessionStorage.getItem('sales');
    if (storedSales) {
      setSales(JSON.parse(storedSales));
    } else {
      fetchSales(); // Appel à la fonction fetchSales pour récupérer les ventes depuis l'API
    }
  }, [navigate]); // Ajoutez navigate comme dépendance pour que useEffect s'exécute à chaque changement de l'historique

  useEffect(() => {
    sessionStorage.setItem('sales', JSON.stringify(sales)); // Stockez les ventes dans sessionStorage chaque fois qu'elles sont mises à jour
  }, [sales]);

  const fetchSales = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/sales', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`, // Ajoutez le token d'authentification dans les headers de la requête
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch sales');
      }
      const data = await response.json();
      setSales(data); // Mettez à jour l'état des ventes avec les données récupérées depuis l'API
    } catch (error) {
      console.error('There was an error fetching the sales!', error);
    }
  };

  return (
    <div>
      <h2>Sales</h2>
      <ul>
        {sales.map(sale => (
          <li key={sale.id}>
            {/* Affichez les détails de la vente ici */}
            {sale.product_id} - {sale.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SaleList;

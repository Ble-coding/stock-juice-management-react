import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importez useNavigate pour gérer la redirection

const StockList = () => {
  const [stocks, setStocks] = useState([]);
  const navigate = useNavigate(); // Initialisez useNavigate pour la gestion de la redirection

  useEffect(() => {
    const token = sessionStorage.getItem('token'); // Vérifiez la présence du token dans sessionStorage

    if (!token) {
      // Si le token n'est pas présent, redirigez l'utilisateur vers la page de connexion
      navigate('/login'); // Assurez-vous que '/login' correspond au chemin de votre page de connexion
      return; // Arrêtez l'exécution de useEffect
    }

    const storedStocks = sessionStorage.getItem('stocks');
    if (storedStocks) {
      setStocks(JSON.parse(storedStocks));
    } else {
      fetchStocks();
    }
  }, [navigate]); // Ajoutez navigate comme dépendance pour que useEffect s'exécute à chaque changement de l'historique

  const fetchStocks = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/stocks', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`, // Ajoutez le token d'authentification dans les headers de la requête
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch stocks');
      }
      const data = await response.json();
      setStocks(data);
      sessionStorage.setItem('stocks', JSON.stringify(data));
    } catch (error) {
      console.error('There was an error fetching the stocks!', error);
    }
  };

  return (
    <div>
      <h2>Stocks</h2>
      <ul>
        {stocks.map(stock => (
          <li key={stock.id}>
            {/* Affichez les détails du stock ici */}
            {stock.product_id} - {stock.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockList;

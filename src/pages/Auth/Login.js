import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Utilisation de useNavigate pour la gestion de la navigation

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Authentication failed');
      }

      const data = await response.json();
      const token = data.token; // Supposons que votre API renvoie un objet avec un champ 'token'

      if (token) {
        // Stockez le token dans sessionStorage ou localStorage pour une utilisation ultérieure
        sessionStorage.setItem('token', token);

        // Redirection vers la page d'accueil ou une autre vue après la connexion réussie
        navigate('/dashboard'); // Redirige vers '/dashboard' après la connexion

        console.log('User logged in successfully!');
      } else {
        console.error('Token not received from API');
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      // Gestion des erreurs, par exemple affichage d'un message d'erreur à l'utilisateur
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Votre email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Votre mot de passe"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Me connecter</button>
      </form>
    </>
  );
};

export default Login;

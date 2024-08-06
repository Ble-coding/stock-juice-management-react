import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Utilisation de useNavigate pour la gestion de la navigation

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }), // Envoyer les données d'inscription
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      const token = data.token; // Supposons que votre API renvoie un objet avec un champ 'token' après l'inscription

      if (token) {
        // Stockez le token dans sessionStorage ou localStorage pour une utilisation ultérieure
        sessionStorage.setItem('token', token);

        // Redirection vers la page d'accueil ou une autre vue après l'inscription réussie
        navigate('/dashboard'); // Redirige vers '/dashboard' après l'inscription

        console.log('User registered successfully!');
      } else {
        console.error('Token not received from API after registration');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      // Gestion des erreurs, par exemple affichage d'un message d'erreur à l'utilisateur
    }
  };

  return (
    <>
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Votre nom d'utilisateur"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
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
        <button type="submit">M'inscrire</button>
      </form>
    </>
  );
};

export default Register;

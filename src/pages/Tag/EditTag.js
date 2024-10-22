import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditTag = () => {
  const { id } = useParams(); // Récupérer l'ID du tag à partir de l'URL
  const navigate = useNavigate();
  
  const [token, setToken] = useState(''); // État pour le token
  const [tag, setTag] = useState({ name: '' });
  const [loading, setLoading] = useState(true); // Gérer l'état du chargement
  const [errors, setErrors] = useState({ name: '' });

  const defaultToken = 'ABCDef1345'; // Token par défaut

  // Gérer le token et la redirection
  useEffect(() => {
    const storedToken = sessionStorage.getItem('token') || defaultToken;

    if (!storedToken) {
      navigate('/login'); // Redirige vers la page de connexion si aucun token
    } else {
      setToken(storedToken); // Met à jour l'état du token si disponible
    }
  }, [navigate]);

  // Charger les données du tag existant
  useEffect(() => {
    const fetchTag = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/tags/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`, // Utilisez le token ici pour l'authentification
          },
        });
        if (!response.ok) {
          throw new Error('Tag non trouvé');
        }
        const data = await response.json();
        setTag(data); // Charger les données dans le formulaire
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des données du tag:', error);
        setLoading(false);
      }
    };

    if (token) {
      fetchTag(); // Appeler la fonction fetchTag uniquement si le token est disponible
    }
  }, [id, token]); // Dépendances: id et token

  // Gérer les changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTag({ ...tag, [name]: value });

    // Réinitialiser l'erreur lorsque l'utilisateur tape
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!tag.name) {
      newErrors.name = 'Le nom est requis';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Veuillez corriger les erreurs dans le formulaire');
      return;
    }

    try {
      // Utilisez l'URL correcte pour la mise à jour
      const response = await fetch(`http://localhost:8000/api/tags/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Ajoutez le token ici pour l'authentification
        },
        body: JSON.stringify(tag), // Envoyer les données mises à jour
      });

      if (response.ok) {
        toast.success('Tag mis à jour avec succès!'); // Notification de succès
        setTimeout(() => {
          navigate(`/tags`); // Rediriger vers la liste des tags après un court délai
        }, 2000);
      } else {
        toast.error('Échec de la mise à jour du tag'); // Notification d'échec
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du tag:', error);
      toast.error('Échec de la mise à jour du tag');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="nk-block nk-block-lg">
      <ToastContainer /> {/* Conteneur pour les notifications Toast */}

      <div className="nk-block-head nk-block-head-sm">
        <div className="nk-block-between g-3">
          <div className="nk-block-head-content">
            <h3 className="nk-block-title page-title">Éditer un Tag</h3>
            <div className="nk-block-des text-soft">
              <p>Page d'édition du tag</p>
            </div>
          </div>
          <div className="nk-block-head-content">
            <Link to="/tags" className="btn btn-outline-light bg-white d-none d-sm-inline-flex">
              <em className="icon ni ni-arrow-left"></em><span>Retour</span>
            </Link>
            <Link to="/tags" className="btn btn-icon btn-outline-light bg-white d-inline-flex d-sm-none">
              <em className="icon ni ni-arrow-left"></em>
            </Link>
          </div>
        </div>
      </div>

      <div className="card card-bordered card-preview">
        <div className="card-inner">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="name">Nom</label>
              <input
                type="text"
                className={`form-control ${errors.name ? 'error' : ''}`} // Classe d'erreur conditionnelle
                id="name"
                name="name"
                value={tag.name}
                onChange={handleChange}
                placeholder="Entrez le nom du tag"
              />
              {errors.name && <div className="error-message">{errors.name}</div>} {/* Message d'erreur */}
            </div>

            <button type="submit" className="btn btn-primary">Mettre à jour le Tag</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditTag;

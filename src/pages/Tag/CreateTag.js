import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const defaultToken = 'ABCDef1345'; // Ajout du token par défaut

const CreateTags = () => {
  const navigate = useNavigate();
  const [tags, setTags] = useState([{ name: '' }]);
  const [errors, setErrors] = useState({});
  const [token, setToken] = useState(defaultToken); // État pour stocker le token

  useEffect(() => {
    // Récupérer le token depuis sessionStorage ou utiliser le token par défaut
    const storedToken = sessionStorage.getItem('token') || defaultToken;

    if (!storedToken) {
      navigate('/login'); // Redirige vers la page de connexion si aucun token
    } else {
      setToken(storedToken); // Met à jour l'état du token si disponible
    }
  }, [navigate]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedTags = [...tags];
    updatedTags[index][name] = value;
    setTags(updatedTags);

    // Réinitialiser l'erreur si nécessaire
    setErrors((prevErrors) => ({
      ...prevErrors,
      [index]: { ...prevErrors[index], [name]: '' }
    }));
  };

  const addTag = () => {
    setTags([...tags, { name: '' }]);
  };

  const removeTag = (index) => {
    if (tags.length > 1) {
      const updatedTags = tags.filter((_, i) => i !== index);
      setTags(updatedTags);
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    tags.forEach((tag, index) => {
      if (!tag.name) {
        newErrors[index] = { ...newErrors[index], name: 'Le nom du tag est requis' };
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm() || tags.length < 1) {
      toast.error('Veuillez corriger les erreurs dans le formulaire ou ajouter au moins un tag');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/tags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Utiliser le token récupéré
        },
        body: JSON.stringify({ tags }),
      });

      if (response.ok) {
        toast.success('Tags créés avec succès!');
        setTags([{ name: '' }]); // Réinitialise les champs après succès
        setTimeout(() => {
          navigate('/tags');
        }, 2000);
      } else {
        toast.error('Échec de la création des tags');
      }
    } catch (error) {
      console.error('Erreur lors de la création des tags:', error);
      toast.error('Échec de la création des tags');
    }
  };

  return (
    <div className="nk-block nk-block-lg">
      <ToastContainer />

      <div className="nk-block-head nk-block-head-sm">
        <div className="nk-block-between g-3">
          <div className="nk-block-head-content">
            <h3 className="nk-block-title page-title">Créer des Tags</h3>
          </div>
          <div className="nk-block-head-content">
            <Link to="/tags" className="btn btn-outline-light bg-white">
              Retour
            </Link>
          </div>
        </div>
      </div>

      <div className="card card-bordered card-preview">
        <div className="card-inner">
          <form onSubmit={handleSubmit}>
            {tags.map((tag, index) => (
              <div key={index} className="form-group">
                <label className="form-label" htmlFor={`name-${index}`}>Nom</label>
                <input
                  type="text"
                  className={`form-control ${errors[index]?.name ? 'error' : ''}`}
                  id={`name-${index}`}
                  name="name"
                  value={tag.name}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Entrez le nom du tag"
                />
                {errors[index]?.name && <div className="error-message">{errors[index].name}</div>}

                <button
                  type="button"
                  onClick={() => removeTag(index)}
                  className="btn btn-danger m-2"
                  disabled={tags.length === 1}
                >
                  Supprimer ce tag
                </button>
              </div>
            ))}
            <button type="button" onClick={addTag} className="btn btn-secondary m-2">Ajouter un tag</button>
            <button type="submit" className="btn btn-primary">Créer les Tags</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTags;

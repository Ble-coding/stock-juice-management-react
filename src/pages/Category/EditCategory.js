import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const EditCategory = () => {
  const { id } = useParams(); // Récupérer l'ID de la catégorie à partir de l'URL
  const navigate = useNavigate();
  const [category, setCategory] = useState({
    name: '',
    description: '',
  });

  const [loading, setLoading] = useState(true); // Gérer l'état du chargement
  const [errors, setErrors] = useState({
    name: '',
    description: '',
  });

  // Charger les données de la catégorie existante
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/categories/${id}`); // Utiliser l'URL correcte
        if (!response.ok) {
          throw new Error('Catégorie non trouvée');
        }
        const data = await response.json();
        setCategory(data); // Charger les données dans le formulaire
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des données de la catégorie:', error);
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  // Gérer les changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });

    // Réinitialiser l'erreur lorsque l'utilisateur tape
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!category.name) {
      newErrors.name = 'Le nom est requis';
      isValid = false;
    }
    if (!category.description) {
      newErrors.description = 'La description est requise';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Gérer la soumission du formulaire
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!validateForm()) {
  //     toast.error('Veuillez corriger les erreurs dans le formulaire');
  //     return;
  //   }

  //   try {
  //     const response = await fetch(`http://localhost:8000/api/categories/${id}`, { // Assurez-vous que l'URL est correcte
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${sessionStorage.getItem('token')}`, // Ajoutez le token ici si nécessaire
  //       },
  //       body: JSON.stringify(category), // Envoyer les données mises à jour
  //     });

  //     if (response.ok) {
  //       toast.success('Catégorie mise à jour avec succès!'); // Notification de succès
  //       setTimeout(() => {
  //         navigate(`/categories/${id}`); // Rediriger après un court délai
  //       }, 2000);
  //     } else {
  //       toast.error('Échec de la mise à jour de la catégorie'); // Notification d'échec
  //     }
  //   } catch (error) {
  //     console.error('Erreur lors de la mise à jour de la catégorie:', error);
  //     toast.error('Échec de la mise à jour de la catégorie');
  //   }
  // };

  const handleSubmit = async (e) => {
      e.preventDefault();

      if (!validateForm()) {
        toast.error('Veuillez corriger les erreurs dans le formulaire');
        return;
      }

      try {
        // Utilisez l'URL correcte pour la mise à jour
        const response = await fetch(`http://localhost:8000/api/categories/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(category), // Envoyer les données mises à jour
        });

        if (response.ok) {
          toast.success('Catégorie mise à jour avec succès!'); // Notification de succès
          setTimeout(() => {
            navigate(`/categories/${id}`); // Rediriger après un court délai
          }, 2000);
        } else {
          toast.error('Échec de la mise à jour de la catégorie'); // Notification d'échec
        }
      } catch (error) {
        console.error('Erreur lors de la mise à jour de la catégorie:', error);
        toast.error('Échec de la mise à jour de la catégorie');
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
            <h3 className="nk-block-title page-title">Éditer une Catégorie</h3>
            <div className="nk-block-des text-soft">
              <p>Page d'édition de la catégorie</p>
            </div>
          </div>
          <div className="nk-block-head-content">
            <Link to="/categories" className="btn btn-outline-light bg-white d-none d-sm-inline-flex">
              <em className="icon ni ni-arrow-left"></em><span>Retour</span>
            </Link>
            <Link to="/categories" className="btn btn-icon btn-outline-light bg-white d-inline-flex d-sm-none">
              <em className="icon ni ni-arrow-left"></em>
            </Link>
          </div>
        </div>
      </div>

      <div className="card card-bordered card-preview">
        <div className="card-inner">
          <h4 className="nk-block-title">Modifier la Catégorie</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="name">Nom</label>
              <input
                type="text"
                className={`form-control ${errors.name ? 'error' : ''}`} // Classe d'erreur conditionnelle
                id="name"
                name="name"
                value={category.name}
                onChange={handleChange}
                placeholder="Entrez le nom de la catégorie"
              />
              {errors.name && <div className="error-message">{errors.name}</div>} {/* Message d'erreur */}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="description">Description</label>
              <textarea
                className={`form-control ${errors.description ? 'error' : ''}`} // Classe d'erreur conditionnelle
                id="description"
                name="description"
                value={category.description}
                onChange={handleChange}
                placeholder="Entrez la description de la catégorie"
              />
              {errors.description && <div className="error-message">{errors.description}</div>} {/* Message d'erreur */}
            </div>
            <button type="submit" className="btn btn-primary">Mettre à jour la Catégorie</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCategory;

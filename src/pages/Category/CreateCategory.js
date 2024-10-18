import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const CreateCategories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([{ name: '', description: '' }]);
  const [errors, setErrors] = useState({});

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedCategories = [...categories];
    updatedCategories[index][name] = value;
    setCategories(updatedCategories);
    
    // Réinitialiser l'erreur si nécessaire
    setErrors({ ...errors, [index]: { ...errors[index], [name]: '' } });
  };

  const addCategory = () => {
    setCategories([...categories, { name: '', description: '' }]);
  };

  const removeCategory = (index) => {
    if (categories.length > 1) { // Ne pas permettre de supprimer si c'est le seul champ
      const updatedCategories = categories.filter((_, i) => i !== index);
      setCategories(updatedCategories);
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    categories.forEach((category, index) => {
      if (!category.name) {
        newErrors[index] = { ...newErrors[index], name: 'Le nom de la catégorie est requis' };
        isValid = false;
      }
      if (!category.description) {
        newErrors[index] = { ...newErrors[index], description: 'La description de la catégorie est requise' };
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm() || categories.length < 1) {
      toast.error('Veuillez corriger les erreurs dans le formulaire ou ajouter au moins une catégorie');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ categories }), // Envoyer le tableau de catégories
      });

      if (response.ok) {
        toast.success('Catégories créées avec succès!');
        setTimeout(() => {
          navigate('/categories');
        }, 2000);
      } else {
        toast.error('Échec de la création des catégories');
      }
    } catch (error) {
      console.error('Erreur lors de la création des catégories:', error);
      toast.error('Échec de la création des catégories');
    }
  };

  return (
    <div className="nk-block nk-block-lg">
      <ToastContainer />

      <div className="nk-block-head nk-block-head-sm">
        <div className="nk-block-between g-3">
          <div className="nk-block-head-content">
            <h3 className="nk-block-title page-title">Créer des Catégories</h3>
          </div>
          <div className="nk-block-head-content">
            <Link to="/categories" className="btn btn-outline-light bg-white">
              Retour
            </Link>
          </div>
        </div>
      </div>

      <div className="card card-bordered card-preview">
        <div className="card-inner">
          <form onSubmit={handleSubmit}>
            {categories.map((category, index) => (
              <div key={index} className="form-group">
                <label className="form-label" htmlFor={`name-${index}`}>Nom</label>
                <input
                  type="text"
                  className={`form-control ${errors[index]?.name ? 'error' : ''}`}
                  id={`name-${index}`}
                  name="name"
                  value={category.name}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Entrez le nom de la catégorie"
                />
                {errors[index]?.name && <div className="error-message">{errors[index].name}</div>}
                
                <label className="form-label mt-2" htmlFor={`description-${index}`}>Description</label>
                <textarea
                  className={`form-control ${errors[index]?.description ? 'error' : ''}`}
                  id={`description-${index}`}
                  name="description"
                  value={category.description}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Entrez la description de la catégorie"
                />
                {errors[index]?.description && <div className="error-message">{errors[index].description}</div>}
                
                <button 
                  type="button" 
                  onClick={() => removeCategory(index)} 
                  className="btn btn-danger m-2" 
                  disabled={categories.length === 1} // Désactiver si c'est le seul champ
                >
                  Supprimer cette catégorie
                </button>
              </div>
            ))}
            <button type="button" onClick={addCategory} className="btn btn-secondary m-2">Ajouter une Catégorie</button>
            <button type="submit" className="btn btn-primary">Créer les Catégories</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCategories;

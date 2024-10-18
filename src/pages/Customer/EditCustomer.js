import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditCustomer = () => {
  const { id } = useParams(); // Récupérer l'ID du client à partir de l'URL
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    kyc_status: '',
    registered_at: ''
  });

  const [loading, setLoading] = useState(true); // Gérer l'état du chargement
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  // Récupérer le token d'authentification
  const defaultToken = 'ABCDef1345'; // Token par défaut
  const [token, setToken] = useState(defaultToken); // État pour stocker le token

  // Vérifier si le token est présent
  useEffect(() => {
    // Récupérer le token depuis sessionStorage ou utiliser le token par défaut
    const storedToken = sessionStorage.getItem('token') || defaultToken;

    if (!storedToken) {
      navigate('/login'); // Redirige vers la page de connexion si aucun token
    } else {
      setToken(storedToken); // Met à jour l'état du token si disponible
    }
  }, [navigate]);

  // Charger les données du client existant
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/customers/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`, // Inclure le token dans l'en-tête
          },
        });
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données du client');
        }
        const data = await response.json();
        setCustomer({
          ...data,
          registered_at: new Date(data.registered_at).toISOString().split('T')[0] // Format de la date
        }); // Charger les données dans le formulaire
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des données du client:', error);
        toast.error('Erreur lors de la récupération des données du client'); // Notification d'erreur
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id, token]);

  // Gérer les changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });

    // Réinitialiser l'erreur lorsque l'utilisateur tape
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!customer.name) {
      newErrors.name = 'Le nom est requis';
      isValid = false;
    }
    if (!customer.email) {
      newErrors.email = 'L\'email est requis';
      isValid = false;
    }
    if (!customer.phone) {
      newErrors.phone = 'Le téléphone est requis';
      isValid = false;
    }
    if (!customer.address) {
      newErrors.address = 'L\'adresse est requise';
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
      const response = await fetch(`http://localhost:8000/api/customers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Inclure le token dans l'en-tête
        },
        body: JSON.stringify(customer), // Envoyer les données mises à jour
      });

      if (response.ok) {
        toast.success('Client mis à jour avec succès!'); // Notification de succès
        setTimeout(() => {
          navigate(`/customers/${id}`); // Rediriger après un court délai
        }, 2000);
      } else {
        toast.error('Échec de la mise à jour du client'); // Notification d'échec
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du client:', error);
      toast.error('Échec de la mise à jour du client');
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
            <h3 className="nk-block-title page-title">Éditer un Client</h3>
            <div className="nk-block-des text-soft">
              <p>Page d'édition du client</p>
            </div>
          </div>
          <div className="nk-block-head-content">
            <Link to="/customers" className="btn btn-outline-light bg-white d-none d-sm-inline-flex">
              <em className="icon ni ni-arrow-left"></em><span>Retour</span>
            </Link>
            <Link to="/customers" className="btn btn-icon btn-outline-light bg-white d-inline-flex d-sm-none">
              <em className="icon ni ni-arrow-left"></em>
            </Link>
          </div>
        </div>
      </div>

      <div className="card card-bordered card-preview">
        <div className="card-inner">
          <h4 className="nk-block-title">Modifier le Client</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="name">Nom</label>
              <input
                type="text"
                className={`form-control ${errors.name ? 'error' : ''}`} // Classe d'erreur conditionnelle
                id="name"
                name="name"
                value={customer.name}
                onChange={handleChange}
                placeholder="Entrez le nom du client"
              />
              {errors.name && <div className="error-message">{errors.name}</div>} {/* Message d'erreur */}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email</label>
              <input
                type="email"
                className={`form-control ${errors.email ? 'error' : ''}`} // Classe d'erreur conditionnelle
                id="email"
                name="email"
                value={customer.email}
                onChange={handleChange}
                placeholder="Entrez l'email du client"
              />
              {errors.email && <div className="error-message">{errors.email}</div>} {/* Message d'erreur */}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="phone">Téléphone</label>
              <input
                type="text"
                className={`form-control ${errors.phone ? 'error' : ''}`} // Classe d'erreur conditionnelle
                id="phone"
                name="phone"
                value={customer.phone}
                onChange={handleChange}
                placeholder="Entrez le téléphone du client"
              />
              {errors.phone && <div className="error-message">{errors.phone}</div>} {/* Message d'erreur */}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="address">Adresse</label>
              <textarea
                className={`form-control ${errors.address ? 'error' : ''}`} // Classe d'erreur conditionnelle
                id="address"
                name="address"
                value={customer.address}
                onChange={handleChange}
                placeholder="Entrez l'adresse du client"
              />
              {errors.address && <div className="error-message">{errors.address}</div>} {/* Message d'erreur */}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="kyc_status">Statut KYC</label>
              <select
                className="form-control"
                id="kyc_status"
                name="kyc_status"
                value={customer.kyc_status}
                onChange={handleChange}
              >
                <option value="not_verified">Non Vérifié</option>
                <option value="verified">Vérifié</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="registered_at">Date d'Inscription</label>
              <input
                type="date"
                className="form-control"
                id="registered_at"
                name="registered_at"
                value={customer.registered_at}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">Mettre à Jour</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCustomer;

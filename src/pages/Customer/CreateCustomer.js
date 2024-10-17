import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateCustomer = () => {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    kyc_status: 'pending', // Valeur par défaut
    registered_at: new Date().toISOString().split('T')[0], // Date actuelle par défaut
  });

  // Gérer les changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  // Gérer la soumission du formulaire pour créer un nouveau client
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customer), // Envoyer les données du nouveau client
      });

      if (response.ok) {
        toast.success('Client créé avec succès!'); // Notification de succès
        setTimeout(() => {
          navigate('/customers'); // Rediriger vers la liste des clients après un délai
        }, 2000);
      } else {
        toast.error('Échec de la création du client'); // Notification d'échec
      }
    } catch (error) {
      console.error('Erreur lors de la création du client:', error);
      toast.error('Échec de la création du client');
    }
  };

  return (
    <div className="nk-block nk-block-lg">
      <ToastContainer /> {/* Conteneur pour les notifications Toast */}

      <div className="nk-block-head nk-block-head-sm">
        <div className="nk-block-between g-3">
          <div className="nk-block-head-content">
            <h3 className="nk-block-title page-title">Créer un Client</h3>
            <div className="nk-block-des text-soft">
              <p>Page de création de client</p>
            </div>
          </div>
          <div className="nk-block-head-content">
            <a href="/customers" className="btn btn-outline-light bg-white d-none d-sm-inline-flex">
              <em className="icon ni ni-arrow-left"></em><span>Retour</span>
            </a>
            <a href="/customers" className="btn btn-icon btn-outline-light bg-white d-inline-flex d-sm-none">
              <em className="icon ni ni-arrow-left"></em>
            </a>
          </div>
        </div>
      </div>

      <div className="card card-bordered card-preview">
        <div className="card-inner">
          <h4 className="nk-block-title">Créer un Nouveau Client</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="name">Nom</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={customer.name}
                onChange={handleChange}
                placeholder="Entrez le nom du client"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={customer.email}
                onChange={handleChange}
                placeholder="Entrez l'email du client"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="phone">Téléphone</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                value={customer.phone}
                onChange={handleChange}
                placeholder="Entrez le téléphone du client"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="address">Adresse</label>
              <textarea
                className="form-control"
                id="address"
                name="address"
                value={customer.address}
                onChange={handleChange}
                placeholder="Entrez l'adresse du client"
                required
              />
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
                <option value="pending">En attente</option>
                <option value="approved">Approuvé</option>
                <option value="rejected">Rejeté</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="registered_at">Date d'enregistrement</label>
              <input
                type="date"
                className="form-control"
                id="registered_at"
                name="registered_at"
                value={customer.registered_at}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Créer le Client</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCustomer;
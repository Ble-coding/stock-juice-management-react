import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
    // last_login: '',
    registered_at: ''
  });

  const [loading, setLoading] = useState(true); // Gérer l'état du chargement

  // Charger les données du client existant
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/customers/${id}`);
        const data = await response.json();
        setCustomer(data); // Charger les données dans le formulaire
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des données du client:', error);
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id]);

  // Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8000/api/customers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customer), // Envoyer les données mises à jour
      });

      if (response.ok) {
        toast.success('Customer updated successfully!'); // Notification de succès
        setTimeout(() => {
          navigate(`/customers/${id}`); // Rediriger après un court délai
        }, 2000);
      } else {
        toast.error('Failed to update customer'); // Notification d'échec
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du client:', error);
      toast.error('Failed to update customer');
    }
  };

  // Gérer les changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
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
                  <h3 className="nk-block-title page-title">Customer Edit</h3>
                  <div className="nk-block-des text-soft">
                    <p>Customer edit page</p>
                  </div>
                </div>
                <div className="nk-block-head-content">
                  <a href="/customers" className="btn btn-outline-light bg-white d-none d-sm-inline-flex">
                    <em className="icon ni ni-arrow-left"></em><span>Back</span>
                  </a>
                  <a href="/customers" className="btn btn-icon btn-outline-light bg-white d-inline-flex d-sm-none">
                    <em className="icon ni ni-arrow-left"></em>
                  </a>
                </div>
              </div>
      </div>
      <div className="card card-bordered card-preview">
        <div className="card-inner">
          <h4 className="nk-block-title">Edit Customer</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={customer.name}
                onChange={handleChange}
                placeholder="Enter customer name"
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
                placeholder="Enter customer email"
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="phone">Phone</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                value={customer.phone}
                onChange={handleChange}
                placeholder="Enter customer phone"
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="address">Address</label>
              <textarea
                className="form-control"
                id="address"
                name="address"
                value={customer.address}
                onChange={handleChange}
                placeholder="Enter customer address"
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="kyc_status">KYC Status</label>
              <select
                className="form-control"
                id="kyc_status"
                name="kyc_status"
                value={customer.kyc_status}
                onChange={handleChange}
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            {/* <div className="form-group">
              <label className="form-label" htmlFor="last_login">Last Login</label>
              <input
                type="datetime-local"
                className="form-control"
                id="last_login"
                name="last_login"
                value={customer.last_login ? new Date(customer.last_login).toISOString().substring(0, 16) : ''}
                onChange={handleChange}
              />
            </div> */}
            <div className="form-group">
              <label className="form-label" htmlFor="registered_at">Register Date</label>
              <input
                type="date"
                className="form-control"
                id="registered_at"
                name="registered_at"
                value={customer.registered_at ? new Date(customer.registered_at).toISOString().split('T')[0] : ''}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">Update Customer</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCustomer;

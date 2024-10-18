import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import avatarImage from '../../images/avatar/b-sm.jpg'; // Ajuster le chemin de l'image selon ton projet
import { Link } from 'react-router-dom';

const ViewCustomer = () => {
  const { id } = useParams(); // Récupère l'ID du client à partir de l'URL
  const [customer, setCustomer] = useState(null); // État pour stocker les données du client
  const [loading, setLoading] = useState(true); // Pour gérer le chargement
  const defaultToken = 'ABCDef1345'; // Token par défaut
  const [token, setToken] = useState(defaultToken); // État pour stocker le token
  const navigate = useNavigate(); // Utiliser pour la redirection

  useEffect(() => {
    // Vérifier si le token est présent
    const storedToken = sessionStorage.getItem('token') || defaultToken;

    if (!storedToken) {
      navigate('/login'); // Redirige vers la page de connexion si aucun token
    } else {
      setToken(storedToken); // Met à jour l'état du token si disponible
    }
  }, [navigate]);

  useEffect(() => {
    // Fonction pour récupérer les données du client via API
    const fetchCustomer = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/customers/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}` // Ajout de l'en-tête d'autorisation avec le token
          }
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données'); // Gérer l'erreur si la réponse n'est pas correcte
        }

        const data = await response.json();
        setCustomer(data); // Met à jour l'état avec les données du client
        setLoading(false); // Indiquer que le chargement est terminé
      } catch (error) {
        console.error("Erreur lors de la récupération des données du client:", error);
        setLoading(false); // Même en cas d'erreur, stopper le chargement
      }
    };

    fetchCustomer();
  }, [id, token]); // Ajout du token comme dépendance

  if (loading) {
    return <div>Loading...</div>; // Indicateur de chargement
  }

  if (!customer) {
    return <div>Erreur: Client non trouvé</div>; // Gérer le cas où les données du client ne sont pas disponibles
  }

  return (
    <div className="nk-content">
      <div className="container">
        <div className="nk-content-inner">
          <div className="nk-content-body">
            <div className="nk-block-head nk-block-head-sm">
              <div className="nk-block-between g-3">
                <div className="nk-block-head-content">
                  <h3 className="nk-block-title page-title">Customer Details</h3>
                  <div className="nk-block-des text-soft">
                    <p>Customer details page</p>
                  </div>
                </div>
                <div className="nk-block-head-content">
                  <Link to="/customers" className="btn btn-outline-light bg-white d-none d-sm-inline-flex">
                    <em className="icon ni ni-arrow-left"></em><span>Back</span>
                  </Link>
                  <Link to="/customers" className="btn btn-icon btn-outline-light bg-white d-inline-flex d-sm-none">
                    <em className="icon ni ni-arrow-left"></em>
                  </Link>
                </div>
              </div>
            </div>

            <div className="nk-block">
              <div className="row g-gs">
                {/* Partie gauche avec les détails de l'utilisateur */}
                <div className="col-lg-4 col-xl-4 col-xxl-3">
                  <div className="card card-bordered">
                    <div className="card-inner-group">
                      <div className="card-inner">
                        <div className="user-card user-card-s2">
                          <div className="user-avatar lg bg-primary">
                            <img src={avatarImage} alt="Customer Avatar" />
                          </div>
                          <div className="user-info">
                            <h5>{customer.name}</h5> {/* Nom du client */}
                            <span className="sub-text">{customer.email}</span> {/* Email du client */}
                          </div>
                        </div>
                      </div>

                      {/* Détails courts */}
                      <div className="card-inner">
                        <h6 className="overline-title mb-2">Short Details</h6>
                        <div className="row g-3">
                          <div className="col-sm-6 col-md-4 col-lg-12">
                            <span className="sub-text">User ID:</span>
                            <span>{customer.code_customer}</span> {/* Code client unique */}
                          </div>
                          <div className="col-sm-6 col-md-4 col-lg-12">
                            <span className="sub-text">Email:</span>
                            <span>{customer.email}</span> {/* Email */}
                          </div>
                          <div className="col-sm-6 col-md-4 col-lg-12">
                            <span className="sub-text">Address:</span>
                            <span>{customer.address}</span> {/* Adresse */}
                          </div>
                          <div className="col-sm-6 col-md-4 col-lg-12">
                            <span className="sub-text">Phone:</span>
                            <span>{customer.phone}</span> {/* Téléphone */}
                          </div>
                          <div className="col-sm-6 col-md-4 col-lg-12">
                            <span className="sub-text">Last Login:</span>
                            <span>{customer.last_login ? new Date(customer.last_login).toLocaleString() : "Never"}</span> {/* Dernière connexion */}
                          </div>
                          <div className="col-sm-6 col-md-4 col-lg-12">
                            <span className="sub-text">KYC Status:</span>
                            <span className={`lead-text ${customer.kyc_status === 'approved' ? 'text-success' : 'text-warning'}`}>
                              {customer.kyc_status.charAt(0).toUpperCase() + customer.kyc_status.slice(1)}
                            </span> {/* Statut KYC */}
                          </div>
                          <div className="col-sm-6 col-md-4 col-lg-12">
                            <span className="sub-text">Register At:</span>
                            <span>{new Date(customer.registered_at).toLocaleDateString()}</span> {/* Date d'enregistrement */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Détails à droite */}
                <div className="col-lg-8 col-xl-8 col-xxl-9">
                  <div className="card card-bordered">
                    <div className="card-inner">
                      <div className="nk-block">
                        <h6 className="lead-text mb-3">Recent Orders</h6>
                        <div className="nk-tb-list nk-tb-ulist is-compact border round-sm">
                          <div className="nk-tb-item nk-tb-head">
                            <div className="nk-tb-col">
                              <span className="sub-text">Order ID</span>
                            </div>
                            <div className="nk-tb-col tb-col-sm">
                              <span className="sub-text">Product Name</span>
                            </div>
                            <div className="nk-tb-col tb-col-xxl">
                              <span className="sub-text">Total Price</span>
                            </div>
                            <div className="nk-tb-col">
                              <span className="sub-text">Status</span>
                            </div>
                            <div className="nk-tb-col">
                              <span className="sub-text">Delivery</span>
                            </div>
                          </div>

                          {/* Orders list */}
                          <div className="nk-tb-item">
                            <div className="nk-tb-col">
                              <a href="#"><span className="fw-bold">#4947</span></a>
                            </div>
                            <div className="nk-tb-col tb-col-sm">
                              <span className="tb-product">
                                <img src="./images/product/c.png" alt="" className="thumb" />
                                <span className="title">Black Mi Band Smartwatch</span>
                              </span>
                            </div>
                            <div className="nk-tb-col tb-col-xxl">
                              <span className="amount">$ 89.49</span>
                            </div>
                            <div className="nk-tb-col">
                              <span className="lead-text text-warning">Shipped</span>
                            </div>
                            <div className="nk-tb-col">
                              <span className="sub-text">In 2 days</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="nk-block text-center mt-3">
                        <Link to="/customers" className="btn btn-lg btn-primary">View All Orders</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCustomer;

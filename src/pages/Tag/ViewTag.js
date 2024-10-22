import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const ViewTag = () => {
  const { id } = useParams(); // Récupérer l'ID du tag à partir de l'URL
  const [tag, setTag] = useState(null); // État pour stocker les données du tag
  const [loading, setLoading] = useState(true); // Pour gérer le chargement
  const [error, setError] = useState(null); // Pour gérer les erreurs
  const navigate = useNavigate(); // Hook pour la navigation
  const defaultToken = 'ABCDef1345'; // Token par défaut

  useEffect(() => {
    // Récupérer le token et rediriger si nécessaire
    const savedToken = sessionStorage.getItem('token') || defaultToken;
    if (!savedToken) {
      navigate('/login'); // Redirige vers la page de connexion si aucun token
    } else {
      fetchTag(savedToken); // Charger le tag si le token est valide
    }
  }, [navigate, id]);

  // Fonction pour récupérer les données du tag via API
  const fetchTag = async (authToken) => {
    try {
      const response = await fetch(`http://localhost:8000/api/tags/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`, // Ajouter le token d'authentification
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erreur réseau, impossible de récupérer les données.');
      }

      const data = await response.json();
      setTag(data); // Met à jour l'état avec les données du tag
      setLoading(false); // Indiquer que le chargement est terminé
    } catch (error) {
      setError(error.message);
      setLoading(false); // Même en cas d'erreur, stopper le chargement
    }
  };

  if (loading) {
    return <div>Chargement...</div>; // Indicateur de chargement
  }

  if (error) {
    return <div>Erreur: {error}</div>; // Affiche l'erreur en cas de problème
  }

  if (!tag) {
    return <div>Erreur: Tag non trouvée</div>; // Gérer le cas où les données du tag ne sont pas disponibles
  }

  return (
    <div className="nk-content">
      <div className="container">
        <div className="nk-content-inner">
          <div className="nk-content-body">
            <div className="nk-block-head nk-block-head-sm">
              <div className="nk-block-between g-3">
                <div className="nk-block-head-content">
                  <h3 className="nk-block-title page-title">Tag Details</h3>
                  <div className="nk-block-des text-soft">
                    <p>Tag details page</p>
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

            <div className="nk-block">
              <div className="row g-gs">
                {/* Partie gauche avec les détails du tag */}
                <div className="col-lg-4 col-xl-4 col-xxl-3">
                  <div className="card card-bordered">
                    <div className="card-inner-group">
                      <div className="card-inner">
                        <div className="user-card user-card-s2">
                          <div className="user-info">
                            <h5>{tag.name}</h5> {/* Nom du tag */}
                            <span className="sub-text">Tag ID: {tag.id}</span> {/* ID du tag */}
                          </div>
                        </div>
                      </div>

                      {/* Détails courts */}
                      <div className="card-inner">
                        <h6 className="overline-title mb-2">Détails rapides</h6>
                        <div className="row g-3">
                          <div className="col-sm-6 col-md-4 col-lg-12">
                            <span className="sub-text">Nom du tag:</span>
                            <span>{tag.name}</span> {/* Nom du tag */}
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
                        <h6 className="lead-text mb-3">Produits associés</h6>
                        <div className="nk-tb-list nk-tb-ulist is-compact border round-sm">
                          <div className="nk-tb-item nk-tb-head">
                            <div className="nk-tb-col">
                              <span className="sub-text">ID Produit</span>
                            </div>
                            <div className="nk-tb-col tb-col-sm">
                              <span className="sub-text">Nom du Produit</span>
                            </div>
                            <div className="nk-tb-col tb-col-xxl">
                              <span className="sub-text">Prix</span>
                            </div>
                          </div>

                          {/* List of products associated with the tag */}
                          {tag.products && tag.products.length > 0 ? (
                            tag.products.map((product) => (
                              <div key={product.id} className="nk-tb-item">
                                <div className="nk-tb-col">
                                  <span className="fw-bold">#{product.id}</span>
                                </div>
                                <div className="nk-tb-col tb-col-sm">
                                  <span>{product.name}</span>
                                </div>
                                <div className="nk-tb-col tb-col-xxl">
                                  <span className="amount">${product.price}</span>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div>Aucun produit associé à ce tag.</div>
                          )}
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
    </div>
  );
};

export default ViewTag;

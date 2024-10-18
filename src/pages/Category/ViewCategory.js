import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ViewCategory = () => {
  const { id } = useParams(); // Récupérer l'ID de la catégorie à partir de l'URL
  const [category, setCategory] = useState(null); // État pour stocker les données de la catégorie
  const [loading, setLoading] = useState(true); // Pour gérer le chargement

  useEffect(() => {
    // Fonction pour récupérer les données de la catégorie via API
    const fetchCategory = async () => {
      try {  
        const response = await fetch(`http://localhost:8000/api/categories/${id}`); // Remplacer par l'URL correcte de ton API
        const data = await response.json();
        setCategory(data); // Met à jour l'état avec les données de la catégorie
        setLoading(false); // Indiquer que le chargement est terminé
      } catch (error) {
        console.error("Erreur lors de la récupération des données de la catégorie:", error);
        setLoading(false); // Même en cas d'erreur, stopper le chargement
      }
    };

    fetchCategory();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; // Indicateur de chargement
  }

  if (!category) {
    return <div>Erreur: Catégorie non trouvée</div>; // Gérer le cas où les données de la catégorie ne sont pas disponibles
  }

  return (
    <div className="nk-content">
      <div className="container">
        <div className="nk-content-inner">
          <div className="nk-content-body">
            <div className="nk-block-head nk-block-head-sm">
              <div className="nk-block-between g-3">
                <div className="nk-block-head-content">
                  <h3 className="nk-block-title page-title">Category Details</h3>
                  <div className="nk-block-des text-soft">
                    <p>Category details page</p>
                  </div>
                </div>
                <div className="nk-block-head-content">
                  <Link to="/categories" className="btn btn-outline-light bg-white d-none d-sm-inline-flex">
                    <em className="icon ni ni-arrow-left"></em><span>Back</span>
                  </Link>
                  <Link to="/categories" className="btn btn-icon btn-outline-light bg-white d-inline-flex d-sm-none">
                    <em className="icon ni ni-arrow-left"></em>
                  </Link>
                </div>
              </div>
            </div>

            <div className="nk-block">
              <div className="row g-gs">
                {/* Partie gauche avec les détails de la catégorie */}
                <div className="col-lg-4 col-xl-4 col-xxl-3">
                  <div className="card card-bordered">
                    <div className="card-inner-group">
                      <div className="card-inner">
                        <div className="user-card user-card-s2">
                          <div className="user-info">
                            <h5>{category.name}</h5> {/* Nom de la catégorie */}
                            <span className="sub-text">Category ID: {category.id}</span> {/* ID de la catégorie */}
                          </div>
                        </div>
                      </div>

                      {/* Détails courts */}
                      <div className="card-inner">
                        <h6 className="overline-title mb-2">Short Details</h6>
                        <div className="row g-3">
                          <div className="col-sm-6 col-md-4 col-lg-12">
                            <span className="sub-text">Category Name:</span>
                            <span>{category.name}</span> {/* Nom de la catégorie */}
                          </div>
                          <div className="col-sm-6 col-md-4 col-lg-12">
                            <span className="sub-text">Description:</span>
                            <span>{category.description || 'No description provided'}</span> {/* Description de la catégorie */}
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
                        <h6 className="lead-text mb-3">Associated Products</h6>
                        <div className="nk-tb-list nk-tb-ulist is-compact border round-sm">
                          <div className="nk-tb-item nk-tb-head">
                            <div className="nk-tb-col">
                              <span className="sub-text">Product ID</span>
                            </div>
                            <div className="nk-tb-col tb-col-sm">
                              <span className="sub-text">Product Name</span>
                            </div>
                            <div className="nk-tb-col tb-col-xxl">
                              <span className="sub-text">Price</span>
                            </div>
                          </div>

                          {/* List of products associated with the category */}
                          {category.products && category.products.length > 0 ? (
                            category.products.map((product) => (
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
                            <div>No products associated with this category.</div>
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

export default ViewCategory;

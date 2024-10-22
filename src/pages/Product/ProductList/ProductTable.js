import React, { useState, useEffect } from 'react';
import 'datatables.net';
import { useNavigate } from 'react-router-dom';
import ProductActionsMenu from './ProductActionsMenu';
import Star from './Star';

// Fonction pour générer la plage de pagination
const getPaginationRange = (totalPages, currentPage) => {
  const totalVisiblePages = 5; // Nombre de pages visibles
  let startPage = Math.max(2, currentPage - 1);
  let endPage = Math.min(totalPages - 1, currentPage + 1);

  if (currentPage === 1) {
    endPage = Math.min(totalVisiblePages, totalPages - 1);
  } else if (currentPage === totalPages) {
    startPage = Math.max(2, totalPages - totalVisiblePages + 1);
  }

  const range = [];
  for (let i = startPage; i <= endPage; i++) {
    range.push(i);
  }

  return range;
};

const ProductTable = ({ products = [], openDeleteModal,toggleStarred, openRestoreModal}) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1); // Page actuelle
  const [itemsPerPage] = useState(10); // Nombre d'éléments par page
  const totalPages = Math.ceil(products.length / itemsPerPage); // Total de pages

  // Fonction pour changer de page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calcul des produits à afficher sur la page courante
  const currentProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const paginationRange = getPaginationRange(totalPages, currentPage);

  useEffect(() => {
    if (products.length > 0) {
      let table;
      if (window.$ && window.$.fn.dataTable) {
        table = window.$('.datatable-init').DataTable({
          searching: true,
          paging: false, // Désactivation de la pagination intégrée pour utiliser la nôtre
          lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
          dom: '<"top"lfB>rt<"bottom"p><"clear">',
          buttons: ['copy', 'excel', 'pdf', 'print', 'colvis'],
          language: {
            search: '',
            searchPlaceholder: 'Type in to search',
            lengthMenu: 'Show _MENU_'
          }
        });

        return () => {
          table.destroy();
        };
      }
    }
  }, [products]);

  const handleEdit = (id) => {
    navigate(`/products/edit/${id}`);
  };

  const handleShow = (id) => {
    navigate(`/products/${id}`);
  };
 

  return (
    <div className="nk-block">
      <div className="card card-bordered">
        <div className="card-inner-group">
          <div className="card-inner p-0">
            <div className="nk-tb-list">
              <div className="nk-tb-item nk-tb-head">
                <div className="nk-tb-col nk-tb-col-check">
                  <div className="custom-control custom-control-sm custom-checkbox notext">
                    <input type="checkbox" className="custom-control-input" id="pid" />
                    <label className="custom-control-label" htmlFor="pid"></label>
                  </div>
                </div>
                <div className="nk-tb-col"><span>Name</span></div>
                <div className="nk-tb-col"><span>SKU</span></div>
                <div className="nk-tb-col"><span>Price</span></div>
                <div className="nk-tb-col"><span>Stock</span></div>
                <div className="nk-tb-col tb-col-md"><span>Category</span></div>
                <div className="nk-tb-col tb-col-md"><span>Tags</span></div>
                <div className="nk-tb-col tb-col-md"><em className="tb-asterisk icon ni ni-star-round"></em></div>
                <div className="nk-tb-col"><span>Status</span></div>
                <div className="nk-tb-col"></div>
              </div>

              {(currentProducts.length > 0) ? (
                currentProducts.map((product, index) => (
                  <div className="nk-tb-item" key={index}>
                    <div className="nk-tb-col nk-tb-col-check">
                      <div className="custom-control custom-control-sm custom-checkbox notext">
                        <input type="checkbox" className="custom-control-input" id={`pid${index}`} />
                        <label className="custom-control-label" htmlFor={`pid${index}`}></label>
                      </div>
                    </div>
                
                    <div className="nk-tb-col tb-col-sm">
                      <span className="tb-product">
                          <img 
                            src={product.image}  className="thumb"
                            alt={product.title} 
                            style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
                          />
                          <span className="title">{product.title}</span>
                      </span>
                  </div>
                    <div className="nk-tb-col">
                      <span className="tb-sub">{product.sku}</span>
                    </div>
                    <div className="nk-tb-col">
                      <span className="tb-lead">{product.regular_price}</span>
                    </div>
                    <div className="nk-tb-col">
                      <span className="tb-sub">{product.stock}</span>
                    </div>
                    <div className="nk-tb-col tb-col-md">
                      <span className="tb-sub">
                        {product.categories && product.categories.length > 0
                          ? product.categories.map((category) => category.name).join(', ')
                          : 'No categories'}
                      </span>
                    </div>
                    <div className="nk-tb-col tb-col-md">
                      <span className="tb-sub">
                        {product.tags && product.tags.length > 0
                          ? product.tags.map((tag) => tag.name).join(', ')
                          : 'No tags'}
                      </span>
                    </div>
                    <div className="nk-tb-col tb-col-md">
                      <Star 
                        isStarred={product.is_starred} // Passer le statut d'étoile
                        onClick={() => toggleStarred(product.id)} // Appel de la fonction toggleStarred
                      />
                    </div>
                    <div className="nk-tb-col">
                      <span className="tb-status text-success">{product.status}</span>
                   
                    </div>
                    
                    <div className="nk-tb-col nk-tb-col-tools">
                    <ul className="nk-tb-actions gx-1">
                      {product.deleted_at ? (
                        // Si le produit est désactivé (supprimé)

                        <li className="nk-tb-action-hidden">
                            <a href="#" onClick={() => openRestoreModal(product.id)}  className="btn btn-trigger btn-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Suspend">
                                <span className="tb-status text-danger">Deactive</span>
                            </a>
                        </li> 


                      ) : (
                        // Si le produit est actif
                        <li className="nk-tb-action-hidden">
                          <span className="tb-status text-success">Active</span>
                        </li>
                      )}

                      {!product.deleted_at && (
                        // Si le produit est actif, afficher les actions disponibles
                        <li>
                          <ul className="link-list-opt no-bdr">
                            <ProductActionsMenu
                              product={product}
                              handleEdit={handleEdit}
                              handleShow={handleShow}
                              openDeleteModal={openDeleteModal}
                            />
                          </ul>
                        </li>
                      )}
                    </ul>

                     
                    </div>
                  </div>
                ))
              ) : (
                <div></div>
              )}
            </div>
          </div>

          {/* Pagination */}
          <div className="card-inner">
            <div className="nk-block-between-md g-3">
              <div className="g">
                <ul className="pagination justify-content-center justify-content-md-start">
                  {/* Bouton pour page précédente */}
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => paginate(currentPage - 1)}>
                      <em className="icon ni ni-chevrons-left"></em>
                    </button>
                  </li>

                  {/* Première page */}
                  <li className={`page-item ${currentPage === 1 ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => paginate(1)}>1</button>
                  </li>

                  {/* Pages intermédiaires */}
                  {currentPage > 3 && totalPages > 5 && <li className="page-item"><span className="page-link">...</span></li>}

                  {paginationRange.map((pageNumber) => (
                    <li key={pageNumber} className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => paginate(pageNumber)}>{pageNumber}</button>
                    </li>
                  ))}

                  {/* Ellipse pour pages finales */}
                  {currentPage < totalPages - 2 && totalPages > 5 && <li className="page-item"><span className="page-link">...</span></li>}

                  {/* Dernière page */}
                  {totalPages > 1 && (
                    <li className={`page-item ${currentPage === totalPages ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => paginate(totalPages)}>{totalPages}</button>
                    </li>
                  )}

                  {/* Bouton pour page suivante */}
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => paginate(currentPage + 1)}>
                      <em className="icon ni ni-chevrons-right"></em>
                    </button>
                  </li>
                </ul>
              </div>

              {/* Sélecteur de pages */}
              <div className="g">
                <div className="pagination-goto d-flex justify-content-center justify-content-md-start gx-3">
                  <div>Page</div>
                  <div>
                    <select
                      className="form-select"
                      value={`page-${currentPage}`}
                      onChange={(e) => paginate(Number(e.target.value.split('-')[1]))}
                    >
                      {[...Array(totalPages)].map((_, i) => (
                        <option key={i} value={`page-${i + 1}`}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>OF {totalPages}</div>
                </div>
              </div>
            </div>
          </div>
          {/* Fin pagination */}
        </div>
      </div>
    </div>
  );
};

export default ProductTable;

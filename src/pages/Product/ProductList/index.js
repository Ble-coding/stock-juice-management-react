import React, { useState, useEffect } from 'react';
import AddProduct from './AddProduct';
import ProductTable from './ProductTable';
import ProductModal from './ProductModal';
import SuspendModal from './SuspendModal';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const defaultToken = 'ABCDef1345'; 
  const navigate = useNavigate();
  const [products, setProducts] = useState([]); // State to hold all products
  const [filteredProducts, setFilteredProducts] = useState([]); // State to hold filtered products
  const [searchSku, setSearchSku] = useState(''); // State to store the SKU being searched
  const [productToDelete, setProductToDelete] = useState(null); // State to manage product deletion
  const [productToRestore, setProductToRestore] = useState(null); // State to manage product restoration
  const [updateKey, setUpdateKey] = useState(0); // State to force re-render when needed
  const [statusFilter, setStatusFilter] = useState(''); // State to manage selected status filter
  const [starKey, setStarKey] = useState(0); // Re-render étoile

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, [updateKey]);

  useEffect(() => {
    const token = sessionStorage.getItem('token') || defaultToken;

    if (!token) {
      navigate('/login');
      return;
    }

    fetchProducts();
  }, [navigate]);

  const fetchProducts = async () => {
    try {
      
      const response = await fetch('http://localhost:8000/api/products', {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });


      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data); // Populate the products state
      setFilteredProducts(data); // Initially, show all products
      sessionStorage.setItem('products', JSON.stringify(data));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Function to filter products by SKU
  const filterProductsBySku = (sku) => {
    setSearchSku(sku); // Set the SKU to search
    if (sku === '') {
      setFilteredProducts(products); // Show all products if no SKU is entered
    } else {
      const filtered = products.filter((product) => product.sku.toLowerCase().includes(sku.toLowerCase()));
      setFilteredProducts(filtered);
    }
  };

  // Function to filter products by status
  const filterProductsByStatus = (status) => {
    setStatusFilter(status); // Set the selected status
    if (status === '') {
      setFilteredProducts(products); // Show all products if no status is selected
    } else {
      const filtered = products.filter((product) => product.status === status);
      setFilteredProducts(filtered);
    }
  };

  // Function to handle deletion of a product
  const handleDelete = async () => {
    if (!productToDelete) return;
    try {
      const response = await fetch(`http://localhost:8000/api/products/${productToDelete}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setUpdateKey((prev) => prev + 1); // Force re-render after deletion
        setProductToDelete(null); // Reset state
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Function to handle restoration of a product
  const handleRestore = async () => {
    if (!productToRestore) return;
    try {
      const response = await fetch(`http://localhost:8000/api/products/${productToRestore}/restore`, {
        method: 'POST',
      });
      if (response.ok) {
        setUpdateKey((prev) => prev + 1); // Force re-render after restoration
        setProductToRestore(null); // Reset state
      }
    } catch (error) {
      console.error('Error restoring product:', error);
    }
  };

  // Open delete modal
  const openDeleteModal = (id) => {
    setProductToDelete(id);
    const modal = new window.bootstrap.Modal(document.getElementById('modalAlert2'));
    modal.show();
  };
  
  // Open restore modal
  const openRestoreModal = (id) => {
    setProductToRestore(id);
    const modal = new window.bootstrap.Modal(document.getElementById('modalAlert3'));
    modal.show();
  };


  // Dans ProductList.js
  // const toggleStarred = async (productId) => {
  //   try {
  //     const updatedProducts = products.map(product => {
  //       if (product.id === productId) {
  //         return { ...product, is_starred: !product.is_starred };
  //       }
  //       return product;
  //     });
  //     setProducts(updatedProducts);
  //     setFilteredProducts(updatedProducts);
  //     setStarKey(prev => prev + 1); // Force le re-render pour le changement d'étoile
  //   } catch (error) {
  //     console.error('Erreur lors du changement du statut étoilé', error);
  //   }
  // };

  const toggleStarred = async (productId) => {
    try {
      const updatedProducts = products.map(product => {
        if (product.id === productId) {
          return { ...product, is_starred: !product.is_starred };
        }
        return product;
      });
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
      setStarKey(prev => prev + 1); // Force re-render for star change

      // API call to update database
      const response = await fetch(`http://localhost:8000/api/products/${productId}/toggle-starred`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      

      if (!response.ok) {
        throw new Error('Error updating star status.');
      }

      const data = await response.json();
      setProducts(products.map(product => product.id === productId ? { ...product, is_starred: data.is_starred } : product));
    } catch (error) {
      console.error('Error toggling star status', error);
    }
  };

  return (
    <div className="nk-body bg-lighter npc-general has-sidebar">
      <div className="nk-app-root">
        <div className="nk-main">
          <div className="nk-wrap">
            <div className="nk-content">
              <div className="container-fluid">
                <div className="nk-content-inner">
                  <div className="nk-content-body">
                    <div className="nk-block-head nk-block-head-sm">
                      <div className="nk-block-between">
                        <div className="nk-block-head-content">
                          <h3 className="nk-block-title page-title">Products</h3>
                        </div>  
                        <div className="nk-block-head-content">
                          <div className="toggle-wrap nk-block-tools-toggle">
                            <button className="btn btn-icon btn-trigger toggle-expand me-n1" data-target="pageMenu">
                              <em className="icon ni ni-more-v"></em>
                            </button>
                            <div className="toggle-expand-content" data-content="pageMenu">
                              <ul className="nk-block-tools g-3">
                                <li>
                                  <div className="form-control-wrap">
                                    <div className="form-icon form-icon-right">
                                      <em className="icon ni ni-search"></em>
                                    </div>
                                    <input 
                                      type="text" 
                                      className="form-control" 
                                      id="default-04" 
                                      placeholder="Quick search by SKU" 
                                      value={searchSku} 
                                      onChange={(e) => filterProductsBySku(e.target.value)} 
                                    />
                                  </div>
                                </li>
                                <li>
                                  <div className="dropdown">
                                    <button className="dropdown-toggle dropdown-indicator btn btn-outline-light btn-white" data-bs-toggle="dropdown">Status</button>
                                    <div className="dropdown-menu dropdown-menu-end">
                                      <ul className="link-list-opt no-bdr">
                                        <li><button className="dropdown-item" onClick={() => filterProductsByStatus('New Items')}>New Items</button></li>
                                        <li><button className="dropdown-item" onClick={() => filterProductsByStatus('Featured')}>Featured</button></li>
                                        <li><button className="dropdown-item" onClick={() => filterProductsByStatus('Out of Stock')}>Out of Stock</button></li>
                                        <li><button className="dropdown-item" onClick={() => filterProductsByStatus('')}>All</button></li>
                                      </ul>
                                    </div>
                                  </div>
                                </li>
                                <li className="nk-block-tools-opt">
                                  <button data-target="addProduct" className="toggle btn btn-icon btn-primary d-md-none">
                                    <em className="icon ni ni-plus"></em>
                                  </button>
                                  <button data-target="addProduct" className="toggle btn btn-primary d-none d-md-inline-flex">
                                    <em className="icon ni ni-plus"></em><span>Add Product</span>
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Product Table */}
                    <ProductTable 
                      key={updateKey} 
                      products={filteredProducts} 
                      openDeleteModal={openDeleteModal}
                      openRestoreModal={openRestoreModal} 
                      toggleStarred={toggleStarred} 
                    />

                    {/* Modals for product actions */}
                    <ProductModal 
                      productToDelete={productToDelete} 
                      handleDelete={handleDelete} 
                    />
                    <SuspendModal 
                      productToRestore={productToRestore} 
                      handleRestore={handleRestore} 
                    />

                    {/* Add Product Section */}
                    <AddProduct />
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

export default ProductList;

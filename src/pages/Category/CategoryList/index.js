import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CategoryTable from './CategoryTable';
import CategoryModal from './CategoryModal';
import { Link } from 'react-router-dom';
import SuspendModal from './SuspendModal';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [categoryToRestore, setCategoryToRestore] = useState(null);
  const [updateKey, setUpdateKey] = useState(0); // For forcing re-render
  const [deleteKey, setDeleteKey] = useState(0); // For forcing re-render on delete
  const defaultToken = 'ABCDef1345';
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token') || defaultToken;

    if (!token) {
      navigate('/login');
      return;
    }

    fetchCategories();
  }, [navigate]);

  // Function to fetch categories from the API
  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/categories', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }

      const data = await response.json();
      setCategories(data); // Update state with fetched categories
      sessionStorage.setItem('categories', JSON.stringify(data)); // Store in sessionStorage
    } catch (error) {
      console.error('There was an error fetching the categories!', error);
    }
  };

  // Using useEffect to call fetchCategories
  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        await fetchCategories(); // Call fetch function
      } catch (error) {
        console.error('There was an error fetching the categories!', error);
      }
    };

    fetchCategoriesData(); // Execute data fetch
  }, [navigate, updateKey, deleteKey]);

  // Handle delete functionality
  const handleDelete = async () => {
    if (categoryToDelete === null) {
      console.log('No category selected for deletion.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/categories/${categoryToDelete}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete category');
      }

      console.log(`Category with ID ${categoryToDelete} deleted successfully.`);

      // Update categories without removing from the list, just marking as deleted
      setCategories((prevCategories) =>
        prevCategories.map(category =>
          category.id === categoryToDelete
            ? { ...category, deleted_at: new Date().toISOString() } // Mark as deleted
            : category
        )
      );

      // Increment deleteKey to force re-render
      setDeleteKey(prevKey => prevKey + 1);

      toast.success('Category deleted successfully!');
      setCategoryToDelete(null); // Reset the selected category for deletion
    } catch (error) {
      console.error('Error during category deletion:', error);
      toast.error('Failed to delete category');
    }
  };

  // Handle restore functionality
  const handleRestore = async () => {
    if (categoryToRestore === null) {
      console.log('No category selected for restoration.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/categories/${categoryToRestore}/restore`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to restore category');
      }

      const restoredCategory = await response.json();

      // Update the categories list with the restored category
      setCategories((prevCategories) =>
        prevCategories.map(category =>
          category.id === restoredCategory.id
            ? { ...restoredCategory, deleted_at: null } // Mark as restored
            : category
        )
      );

      // Increment updateKey to force re-render
      setUpdateKey(prevKey => prevKey + 1);

      toast.success('Category restored successfully!');
      setCategoryToRestore(null);
    } catch (error) {
      console.error('Error during category restoration:', error);
      toast.error('Failed to restore category');
    }
  };

  const openDeleteModal = (id) => {
    setCategoryToDelete(id);
    const modal = new window.bootstrap.Modal(document.getElementById('modalAlert2'));
    modal.show();
  };

  const openRestoreModal = (id) => {
    setCategoryToRestore(id);
    const modal = new window.bootstrap.Modal(document.getElementById('modalAlert3'));
    modal.show();
  };

  return (
    <div>
      <ToastContainer />
      <div className="nk-block-head nk-block-head-sm">
        <div className="nk-block-between g-3">
          <div className="nk-block-head-content">
            <h3 className="nk-block-title page-title">Categories</h3>
            <div className="nk-block-des text-soft">
              <p>Manage categories for your system</p>
            </div>
          </div>
          <div className="nk-block-head-content">
            <Link to="/categories/create" className="btn btn-primary">
                <em className="icon ni ni-plus"></em><span>Create Category</span>
            </Link>
          </div>
        </div>
      </div>
      <CategoryTable key={updateKey} categories={categories} openDeleteModal={openDeleteModal}
       openRestoreModal={openRestoreModal} />
      <CategoryModal 
        categoryToDelete={categoryToDelete} 
        handleDelete={handleDelete} 
      />
      <SuspendModal 
        categoryToRestore={categoryToRestore} 
        handleRestore={handleRestore} 
      />
    </div>
  );
};

export default CategoryList;

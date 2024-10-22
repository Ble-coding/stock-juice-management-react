import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TagTable from './TagTable';
import TagModal from './TagModal';
import { Link } from 'react-router-dom';
import SuspendModal from './SuspendModal';

const TagList = () => {
  const [tags, setTags] = useState([]);
  const [tagToDelete, setTagToDelete] = useState(null);
  const [tagToRestore, setTagToRestore] = useState(null);
  const [updateKey, setUpdateKey] = useState(0); // For forcing re-render
  const [deleteKey, setDeleteKey] = useState(0); // For forcing re-render on delete
  const navigate = useNavigate();
  const defaultToken = 'ABCDef1345';

  // Fetch tags from API
  const fetchTags = async () => {
    try {
      const token = sessionStorage.getItem('token') || defaultToken;
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch('http://localhost:8000/api/tags', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tags');
      }

      const data = await response.json();
      setTags(data); // Update state with fetched tags
      sessionStorage.setItem('tags', JSON.stringify(data)); // Store in sessionStorage
    } catch (error) {
      console.error('There was an error fetching the tags!', error);
      toast.error('Failed to load tags');
    }
  };

  useEffect(() => {
    fetchTags(); // Call fetchTags when the component mounts or updateKey/deleteKey change
  }, [updateKey, deleteKey, navigate]);

  // Handle delete functionality
  const handleDelete = async () => {
    if (!tagToDelete) {
      console.log('No tag selected for deletion.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/tags/${tagToDelete}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete tag');
      }

      setTags((prevTags) =>
        prevTags.map((tag) =>
          tag.id === tagToDelete ? { ...tag, deleted_at: new Date().toISOString() } : tag
        )
      );

      setDeleteKey((prevKey) => prevKey + 1); // Force re-render
      toast.success('Tag deleted successfully!');
      setTagToDelete(null); // Reset after deletion
    } catch (error) {
      console.error('Error during tag deletion:', error);
      toast.error('Failed to delete tag');
    }
  };

  // Handle restore functionality
  const handleRestore = async () => {
    if (!tagToRestore) {
      console.log('No tag selected for restoration.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/tags/${tagToRestore}/restore`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to restore tag');
      }

      const restoredTag = await response.json();

      setTags((prevTags) =>
        prevTags.map((tag) =>
          tag.id === restoredTag.id ? { ...restoredTag, deleted_at: null } : tag
        )
      );

      setUpdateKey((prevKey) => prevKey + 1); // Force re-render
      toast.success('Tag restored successfully!');
      setTagToRestore(null);
    } catch (error) {
      console.error('Error during tag restoration:', error);
      toast.error('Failed to restore tag');
    }
  };

  const openDeleteModal = (id) => {
    setTagToDelete(id);
    const modal = new window.bootstrap.Modal(document.getElementById('modalAlert2'));
    modal.show();
  };

  const openRestoreModal = (id) => {
    setTagToRestore(id);
    const modal = new window.bootstrap.Modal(document.getElementById('modalAlert3'));
    modal.show();
  };

  return (
    <div>
      <ToastContainer />
      <div className="nk-block-head nk-block-head-sm">
        <div className="nk-block-between g-3">
          <div className="nk-block-head-content">
            <h3 className="nk-block-title page-title">Tags</h3>
            <div className="nk-block-des text-soft">
              <p>Manage tags for your system</p>
            </div>
          </div>
          <div className="nk-block-head-content">
            <Link to="/tags/create" className="btn btn-primary">
              <em className="icon ni ni-plus"></em>
              <span>Create Tag</span>
            </Link>
          </div>
        </div>
      </div>
      <TagTable key={updateKey} tags={tags} openDeleteModal={openDeleteModal} openRestoreModal={openRestoreModal} />
      <TagModal tagToDelete={tagToDelete} handleDelete={handleDelete} />
      <SuspendModal tagToRestore={tagToRestore} handleRestore={handleRestore} />
    </div>
  );
};

export default TagList;

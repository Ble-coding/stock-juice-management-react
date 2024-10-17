import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomerTable from './CustomerTable';
import CustomerModal from './CustomerModal';
import SuspendModal from './SuspendModal';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const [customerToRestore, setCustomerToRestore] = useState(null);
  const [updateKey, setUpdateKey] = useState(0); // Ajoutez ceci
  const [deleteKey, setDeleteKey] = useState(0); // Ajoutez ceci
  const defaultToken = 'ABCDef1345';
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token') || defaultToken;

    if (!token) {
      navigate('/login');
      return;
    }

    fetchCustomers();
  }, [navigate]);

   // Fonction fetchCustomers : Récupérer les clients depuis l'API
    const fetchCustomers = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/customers', {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch customers');
            }

            const data = await response.json();
            setCustomers(data); // Met à jour l'état avec les clients
            sessionStorage.setItem('customers', JSON.stringify(data)); // Enregistre les clients dans sessionStorage
        } catch (error) {
            console.error('There was an error fetching the customers!', error);
        }
    };

    // Utilisation de useEffect pour appeler fetchCustomers
    useEffect(() => {
        const fetchCustomersData = async () => {
            try {
                await fetchCustomers(); // Appeler la fonction pour récupérer les clients
            } catch (error) {
                console.error('There was an error fetching the customers!', error);
            }
        };
    
        fetchCustomersData(); // Exécuter la récupération des données
    }, [navigate, updateKey, deleteKey]);  // Le tableau se recharge à chaque fois que navigate, updateKey ou deleteKey change
    
    const handleDelete = async () => { 
        if (customerToDelete === null) {
            console.log('Aucun client sélectionné pour la suppression.');
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:8000/api/customers/${customerToDelete}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error('Échec de la suppression du client');
            }
    
            console.log(`Client avec l'ID ${customerToDelete} supprimé avec succès.`);
    
            // Mettre à jour le statut deleted_at du client dans la liste sans le retirer
            setCustomers((prevCustomers) =>
                prevCustomers.map(customer =>
                    customer.id === customerToDelete
                        ? { ...customer, deleted_at: new Date().toISOString() }  // Marquer comme supprimé avec deleted_at
                        : customer
                )
            );
    
            // Incrémenter deleteKey pour forcer le re-render
            setDeleteKey(prevKey => prevKey + 1);
    
            toast.success('Customer deleted successfully!');
            setCustomerToDelete(null); // Réinitialiser le client à supprimer
        } catch (error) {
            console.error('Erreur lors de la tentative de suppression du client:', error);
            toast.error('Failed to delete customer');
        }
    };
    
    



    const handleRestore = async () => { 
        if (customerToRestore === null) {
            console.log('Aucun client sélectionné pour la restauration.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8000/api/customers/${customerToRestore}/restore`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Échec de la restauration du client');
            }

            const restoredCustomer = await response.json();

            // Mettre à jour la liste des clients
            setCustomers((prevCustomers) =>
                prevCustomers.map(customer =>
                    customer.id === restoredCustomer.id
                        ? { ...restoredCustomer, deleted_at: null }  // Mise à jour du client restauré
                        : customer
                )
            );
            

            // Incrémenter updateKey pour forcer le re-render
            setUpdateKey(prevKey => prevKey + 1);

            toast.success('Customer restored successfully!');
            setCustomerToRestore(null);
        } catch (error) {
            console.error('Erreur lors de la tentative de restauration du client:', error);
            toast.error('Failed to restore customer');
        }
    };

    

  const openDeleteModal = (id) => {
    setCustomerToDelete(id);
    const modal = new window.bootstrap.Modal(document.getElementById('modalAlert2'));
    modal.show();
  };


  const openRestoreModal = (id) => {
    setCustomerToRestore(id);
    const modal = new window.bootstrap.Modal(document.getElementById('modalAlert3'));
    modal.show();
  };


  return (
    <div>
      
      <ToastContainer />
      <div className="nk-block-head nk-block-head-sm">
              <div className="nk-block-between g-3">
                <div className="nk-block-head-content">
                  <h3 className="nk-block-title page-title">Customers</h3>
                  <div className="nk-block-des text-soft">
                    <p>Customers page</p>
                  </div>
                </div>
                <div className="nk-block-head-content">
                <a href="/customers/create" className="btn btn-primary">
                    <em className="icon ni ni-plus"></em><span>Créer un Client</span>
                </a>
                </div>
              </div>
        </div>
      <CustomerTable key={updateKey} customers={customers} openDeleteModal={openDeleteModal}
       openRestoreModal={openRestoreModal} />
      <CustomerModal 
        customerToDelete={customerToDelete} 
        handleDelete={handleDelete} 
      />
     <SuspendModal 
        customerToRestore={customerToRestore} 
        handleRestore={handleRestore} 
      />
    </div>
  );
};

export default CustomerList;

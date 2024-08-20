import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [customerToDelete, setCustomerToDelete] = useState(null); 
  const defaultToken = 'ABCDef1345';
  const navigate = useNavigate();

  useEffect(() => {
    let token = sessionStorage.getItem('token') || defaultToken;

    if (!token) {
      navigate('/login');
      return;
    }

    fetchCustomers();
  }, [navigate]);

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
      setCustomers(data);
      sessionStorage.setItem('customers', JSON.stringify(data));
    } catch (error) {
      console.error('There was an error fetching the customers!', error);
    }
  };

  const handleDelete = async () => {
    console.log(1);
    if (customerToDelete === null) return;
    try {
      console.log(2);
      const response = await fetch(`http://localhost:8000/api/customers/${customerToDelete}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      console.log({response});
      if (!response.ok) {
        throw new Error('Failed to delete customer');
      }
      console.log(3);

      // Mettre à jour la liste des clients en excluant celui qui vient d'être supprimé
      const updatedCustomers = customers.filter(customer => customer.id !== customerToDelete);
      setCustomers(updatedCustomers);
      console.log('updated table');

        // Rafraîchir le tableau
        fetchCustomers();
        console.log('Rafraîchir');

      // Affichage d'une notification de succès
      toast.success('Customer deleted successfully!');
      console.log('Customer deleted successfully!');

      // Réinitialiser l'identifiant du client à supprimer
      setCustomerToDelete(null);
      console.log('Reinitialiser!');

    } catch (error) {
      console.error('There was an error deleting the customer!', error);
       toast.error('Failed to delete customer');
       console.log('Failed!');
    }
  };

  const handleEdit = (id) => {
    navigate(`/customers/edit/${id}`);
  };

  const handleShow = (id) => {
    navigate(`/customers/${id}`);
  };

  const openDeleteModal = (id) => {
    setCustomerToDelete(id);
    const modal = new window.bootstrap.Modal(document.getElementById('modalAlert2'));
    modal.show();
  };

  useEffect(() => {
    if (customers.length > 0) {
      let table;
      if (window.$ && window.$.fn.dataTable) {
        const table = window.$('.datatable-init').DataTable({
          searching: true,
          paging: true,
          lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
          dom: '<"top"lfB>rt<"bottom"p><"clear">',
          buttons: [
            'copy', 'excel', 'pdf', 'print',
            'colvis'
          ],
          language: {
            search: '',
            searchPlaceholder: 'Type in to search',
            lengthMenu: 'Show _MENU_'
          },
          initComplete: function() {
            window.$('.top').css({
              'display': 'flex',
              'justify-content': 'space-between',
              'align-items': 'center',
              'margin-bottom': '20px'
            });

            window.$('.dataTables_length').css({
              'margin-right': '20px'
            });

            window.$(window).resize(() => {
              if (window.$(window).width() < 768) {
                window.$('.top').css({
                  'flex-direction': 'column',
                  'align-items': 'flex-start'
                });
                window.$('.top > div').css({
                  'margin-bottom': '10px'
                });
              } else {
                window.$('.top').css({
                  'flex-direction': 'row',
                  'align-items': 'center'
                });
                window.$('.top > div').css({
                  'margin-bottom': '0'
                });
              }
            }).trigger('resize');
          }
        });

        return () => {
          table.destroy();
        };
      } else {
        console.error('jQuery or DataTables is not available');
      }

      return () => {
        if (table) {
            table.destroy();
        }
    };
    }
  }, [customers]);

  return (
    <div>
      <h2>Customers</h2>
      <div className="nk-block nk-block-lg">
        <div className="nk-block-head">
          <div className="nk-block-head-content">
            <h4 className="nk-block-title">Data Table</h4>
            <div className="nk-block-des">
              <p>Using the most basic table markup, here’s how <code className="code-class">.table</code> based tables look by default.</p>
            </div>
          </div>
        </div>

        <ToastContainer />

        <div className="card card-bordered card-preview">
          <div className="card-inner">
        
            {customers.length > 0 ? (
              <table className="datatable-init nowrap nk-tb-list nk-tb-ulist" data-auto-responsive="false">
                <thead>
                  <tr className="nk-tb-item nk-tb-head">
                    <th className="nk-tb-col nk-tb-col-check">
                      <span className="sub-text">ID</span>
                    </th>
                    <th className="nk-tb-col"><span className="sub-text">User</span></th>
                    <th className="nk-tb-col tb-col-md"><span className="sub-text">Phone</span></th>
                    <th className="nk-tb-col tb-col-lg"><span className="sub-text">Verified</span></th>
                    <th className="nk-tb-col tb-col-lg"><span className="sub-text">Date d'enregistrement</span></th>
                    <th className="nk-tb-col tb-col-md"><span className="sub-text">Status</span></th>
                    <th className="nk-tb-col nk-tb-col-tools text-end"></th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.id} className="nk-tb-item">
                      <td className="nk-tb-col nk-tb-col-check">
                        {customer.id}
                      </td>
                      <td className="nk-tb-col">
                        <div className="user-card">
                          <div className="user-avatar bg-dim-primary d-none d-sm-flex">
                            <span>{customer.name.charAt(0)}</span>
                          </div>
                          <div className="user-info">
                            <span className="tb-lead">{customer.name} <span className="dot dot-success d-md-none ms-1"></span></span>
                            <span>{customer.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="nk-tb-col tb-col-md">
                        <span>{customer.phone}</span>
                      </td>
                      <td className="nk-tb-col tb-col-lg" data-order="Email Verified - Kyc Unverified">
                        <ul className="list-status">
                          <li><em className="icon text-success ni ni-check-circle"></em> <span>Email</span></li>
                          <li><em className="icon ni ni-alert-circle"></em> <span>KYC</span></li>
                        </ul>
                      </td>
                      <td className="nk-tb-col tb-col-lg">
                        <span>{new Date(customer.created_at).toLocaleDateString()}</span>
                      </td>
                      <td className="nk-tb-col tb-col-md">
                        <span className="tb-status text-success">Active</span>
                      </td>
                      <td className="nk-tb-col nk-tb-col-tools">
                        <ul className="nk-tb-actions gx-1">
                          <li className="nk-tb-action-hidden">
                            <a href="#" className="btn btn-trigger btn-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Wallet">
                              <em className="icon ni ni-wallet-fill"></em>
                            </a>
                          </li>
                          <li className="nk-tb-action-hidden">
                            <a href="#" className="btn btn-trigger btn-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Send Email">
                              <em className="icon ni ni-mail-fill"></em>
                            </a>
                          </li>
                          <li className="nk-tb-action-hidden">
                            <a href="#" className="btn btn-trigger btn-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Suspend">
                              <em className="icon ni ni-user-cross-fill"></em>
                            </a>
                          </li>
                          <li>
                            <div className="dropdown">
                              <a href="#" className="dropdown-toggle btn btn-icon btn-trigger" data-bs-toggle="dropdown">
                                <em className="icon ni ni-more-h"></em>
                              </a>
                              <div className="dropdown-menu dropdown-menu-end">
                                <ul className="link-list-opt no-bdr">
                                  <li>
                                    <a href="#" onClick={() => handleEdit(customer.id)}>
                                      <em className="icon ni ni-edit"></em>
                                      <span>Edit</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#" onClick={() => handleShow(customer.id)}>
                                      <em className="icon ni ni-eye"></em>
                                      <span>Show</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#" onClick={() => openDeleteModal(customer.id)}>
                                      <em className="icon ni ni-trash"></em>
                                      <span>Delete</span>
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>
      </div>

      {/* Modal for Delete Confirmation */}
      <div className="modal fade" tabIndex="-1" id="modalAlert2">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body modal-body-lg text-center">
              <div className="nk-modal">
                <em className="nk-modal-icon icon icon-circle icon-circle-xxl ni ni-alert bg-warning"></em>
                <h4 className="nk-modal-title">Are You Sure?</h4>
                <div className="nk-modal-text">
                  <div className="caption-text">
                    Are you sure you want to delete this record? This action cannot be undone.
                  </div>
                </div>
                <div className="nk-modal-action mt-5 d-flex justify-content-between">
                  <button
                    onClick={handleDelete}
                    className="btn btn-lg btn-mw btn-danger"
                    data-bs-dismiss="modal"
                  >
                    Confirm
                  </button>
                  <button
                    type="button"
                    className="btn btn-lg btn-mw btn-light"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
            <div className="modal-footer bg-lighter">
              <div className="text-center w-100">
                <p>Click on <strong>Confirm</strong> to proceed or <strong>Cancel</strong> to dismiss.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
export default CustomerList;

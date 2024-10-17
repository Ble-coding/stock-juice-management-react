import React, { useEffect } from 'react';
import 'datatables.net';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import CustomerActionsMenu from './CustomerActionsMenu';


const CustomerTable = ({ customers, openDeleteModal,openRestoreModal }) => {
    console.log('Clients dans CustomerTable:', customers); // Log pour vérifier les clients
  const navigate = useNavigate();
  

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

  const handleEdit = (id) => {
    navigate(`/customers/edit/${id}`);
  };

  const handleShow = (id) => {
    navigate(`/customers/${id}`);
  };




  return (
    <div className="card card-bordered card-preview">
      <div className="card-inner">
        {customers.length > 0 ? (
          <table className="datatable-init nowrap nk-tb-list nk-tb-ulist" data-auto-responsive="false">
            <thead>
              <tr className="nk-tb-item nk-tb-head">
                <th className="nk-tb-col nk-tb-col-check"><span className="sub-text">ID</span></th>
                <th className="nk-tb-col nk-tb-col-check"><span className="sub-text">Code</span></th>
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
                  <td className="nk-tb-col nk-tb-col-check">{customer.id}</td>
                  <td className="nk-tb-col nk-tb-col-check">{customer.code_customer}</td>
                  <td className="nk-tb-col">
                    <div className="user-card">
                    <div className="user-avatar bg-dim-primary d-none d-sm-flex">
                        {/* Vérifier si customer.name est défini avant d'utiliser charAt */}
                        <span>{customer.name ? customer.name.charAt(0) : 'N/A'}</span>
                    </div>
                      <div className="user-info">
                        <span className="tb-lead">{customer.name} <span className="dot dot-success d-md-none ms-1"></span></span>
                        <span>{customer.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="nk-tb-col tb-col-md"><span>{customer.phone}</span></td>
                  <td className="nk-tb-col tb-col-lg" data-order="Email Verified - Kyc Unverified">
                    <ul className="list-status">
                      <li><em className="icon text-success ni ni-check-circle"></em> <span>Email</span></li>
                      <li><em className="icon ni ni-alert-circle"></em> <span>KYC</span></li>
                    </ul>
                  </td>
                  <td className="nk-tb-col tb-col-lg"><span>{new Date(customer.registered_at).toLocaleDateString()}</span></td>
                  <td className="nk-tb-col tb-col-md">
                    {/* Si le client est soft deleted, afficher "Deactive" sinon "Active" */}
                    {customer.deleted_at ? (
                    <span className="tb-status text-danger">Deactive</span>  // Client supprimé
                    ) : (
                    <span className="tb-status text-success">Active</span>  // Client actif
                    )}
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
                    
                            {customer.deleted_at ? (
                                   <li className="nk-tb-action-hidden">
                                   <a href="#" onClick={() => openRestoreModal(customer.id)}  className="btn btn-trigger btn-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Suspend">
                                   <em className="icon ni ni-user-cross-fill"></em>
                                   </a>
                               </li> 
                            ) : (
                                <li className="nk-tb-action-hidden">
                                <a href="#" className="btn btn-trigger btn-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Restore">
                                    <em className="icon ni ni-user-check-fill"></em>
                                </a>
                                </li>
                             
                            )}
                        <li>
                        <ul className="link-list-opt no-bdr">
                            <CustomerActionsMenu 
                                customer={customer} 
                                handleEdit={handleEdit} 
                                handleShow={handleShow} 
                                openDeleteModal={openDeleteModal} 
                                openRestoreModal={openRestoreModal} 
                            />
                        </ul>
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
  );
};

export default CustomerTable;

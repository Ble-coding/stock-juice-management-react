import React, { useEffect } from 'react';
import 'datatables.net';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import CategoryActionsMenu from './CategoryActionsMenu'; // Correction: Utilisation de CategoryActionsMenu


const CategoryTable = ({ categories, openDeleteModal, openRestoreModal }) => {
  console.log('Categories dans CategoryTable:', categories); // Log pour vérifier les catégories
  const navigate = useNavigate();

  useEffect(() => {
    if (categories.length > 0) {
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
          initComplete: function () {
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
  }, [categories]);

  const handleEdit = (id) => {
    navigate(`/categories/edit/${id}`);
  };

  const handleShow = (id) => {
    navigate(`/categories/${id}`);
  };

  return (
    <div className="card card-bordered card-preview">
      <div className="card-inner">
        {categories.length > 0 ? (
          <table className="datatable-init nowrap nk-tb-list nk-tb-ulist" data-auto-responsive="false">
            <thead>
              <tr className="nk-tb-item nk-tb-head">
                <th className="nk-tb-col nk-tb-col-check"><span className="sub-text">ID</span></th>
                <th className="nk-tb-col"><span className="sub-text">Nom de la catégorie</span></th>
                <th className="nk-tb-col"><span className="sub-text">Description</span></th>
                <th className="nk-tb-col tb-col-md"><span className="sub-text">Status</span></th>
                <th className="nk-tb-col nk-tb-col-tools text-end"></th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id} className="nk-tb-item">
                  <td className="nk-tb-col nk-tb-col-check">{category.id}</td>
                  <td className="nk-tb-col">{category.name}</td>
                  <td className="nk-tb-col">{category.description}</td>
                  <td className="nk-tb-col tb-col-md">
                    {category.deleted_at ? (
                      <span className="tb-status text-danger">Deactive</span>
                    ) : (
                      <span className="tb-status text-success">Active</span>
                    )}
                  </td>
                  <td className="nk-tb-col nk-tb-col-tools">
                    <ul className="nk-tb-actions gx-1">

                
                      {category.deleted_at ? (
                        <li className="nk-tb-action-hidden">
                          <a href="#" onClick={() => openRestoreModal(category.id)} className="btn btn-trigger btn-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Suspend">
                          <em className="icon ni ni-user-cross-fill"></em>
                          </a>
                        </li>
                      ) : (
                        <li className="nk-tb-action-hidden">
                          <a href="#"  className="btn btn-trigger btn-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Restore">
                          <em className="icon ni ni-user-check-fill"></em>
                          </a>
                        </li>
                      )}
                      <li>
                        <CategoryActionsMenu
                          category={category}
                          handleEdit={handleEdit}
                          handleShow={handleShow}
                          openDeleteModal={openDeleteModal}
                          openRestoreModal={openRestoreModal}
                        />
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

export default CategoryTable;

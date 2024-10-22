import React, { useEffect } from 'react';
import 'datatables.net';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import TagActionsMenu from './TagActionsMenu'; // Utilisation correcte de TagActionsMenu

const TagTable = ({ tags, openDeleteModal, openRestoreModal }) => {
  console.log('Tags dans TagTable:', tags); // Log pour vérifier les tags
  const navigate = useNavigate();

  useEffect(() => {
    if (tags.length > 0) {
      let table;
      if (window.$ && window.$.fn.dataTable) {
        table = window.$('.datatable-init').DataTable({
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
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            });

            window.$('.dataTables_length').css({
              marginRight: '20px'
            });

            window.$(window).resize(() => {
              if (window.$(window).width() < 768) {
                window.$('.top').css({
                  flexDirection: 'column',
                  alignItems: 'flex-start'
                });
                window.$('.top > div').css({
                  marginBottom: '10px'
                });
              } else {
                window.$('.top').css({
                  flexDirection: 'row',
                  alignItems: 'center'
                });
                window.$('.top > div').css({
                  marginBottom: '0'
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
  }, [tags]);

  const handleEdit = (id) => {
    navigate(`/tags/edit/${id}`);
  };

  const handleShow = (id) => {
    navigate(`/tags/${id}`);
  };

  return (
    <div className="card card-bordered card-preview">
      <div className="card-inner">
        {tags.length > 0 ? (
          <table className="datatable-init nowrap nk-tb-list nk-tb-ulist" data-auto-responsive="false">
            <thead>
              <tr className="nk-tb-item nk-tb-head">
                <th className="nk-tb-col nk-tb-col-check"><span className="sub-text">ID</span></th>
                <th className="nk-tb-col"><span className="sub-text">Nom du tag</span></th>
                <th className="nk-tb-col tb-col-md"><span className="sub-text">Status</span></th>
                <th className="nk-tb-col nk-tb-col-tools text-end"></th>
              </tr>
            </thead>
            <tbody>
              {tags.map((tag) => (
                <tr key={tag.id} className="nk-tb-item">
                  <td className="nk-tb-col nk-tb-col-check">{tag.id}</td>
                  <td className="nk-tb-col">{tag.name}</td>
                  <td className="nk-tb-col tb-col-md">
                    {tag.deleted_at ? (
                      <span className="tb-status text-danger">Deactive</span>
                    ) : (
                      <span className="tb-status text-success">Active</span>
                    )}
                  </td>
                  <td className="nk-tb-col nk-tb-col-tools">
                    <ul className="nk-tb-actions gx-1">
                      {tag.deleted_at ? (
                        <li className="nk-tb-action-hidden">
                          <a href="#" onClick={() => openRestoreModal(tag.id)} className="btn btn-trigger btn-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Restore">
                            <em className="icon ni ni-user-check-fill"></em>
                          </a>
                        </li>
                      ) : (
                        <li className="nk-tb-action-hidden">
                          <a href="#" onClick={() => openDeleteModal(tag.id)} className="btn btn-trigger btn-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Suspend">
                            <em className="icon ni ni-user-cross-fill"></em>
                          </a>
                        </li>
                      )}
                      <li>
                        <TagActionsMenu
                          tag={tag}
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

export default TagTable;

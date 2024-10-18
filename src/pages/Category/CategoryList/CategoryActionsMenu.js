import React from 'react';

const CategoryActionsMenu = ({ category, handleEdit, handleShow, openDeleteModal, openRestoreModal }) => {
    if (category.deleted_at) {
        return null; // Ne rien afficher si le client est désactivé
    }
    return (
        <div className="dropdown">
            <a href="#" className="dropdown-toggle btn btn-icon btn-trigger" data-bs-toggle="dropdown">
                <em className="icon ni ni-more-h"></em>
            </a>
            <div className="dropdown-menu dropdown-menu-end">
                <ul className="link-list-opt no-bdr">
                
                            {/* Si la catégorie est active, afficher les options d'édition, affichage et suppression */}
                            <li>
                                <a href="#" onClick={() => handleEdit(category.id)}>
                                    <em className="icon ni ni-edit"></em>
                                    <span>Edit</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" onClick={() => handleShow(category.id)}>
                                    <em className="icon ni ni-eye"></em>
                                    <span>Show</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" onClick={() => openDeleteModal(category.id)}>
                                    <em className="icon ni ni-trash"></em>
                                    <span>Delete</span>
                                </a>
                            </li>
                      
                </ul>
            </div>
        </div>
    );
};

export default CategoryActionsMenu;

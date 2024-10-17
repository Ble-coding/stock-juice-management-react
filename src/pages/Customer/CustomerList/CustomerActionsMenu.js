// src/components/CustomerActionsMenu.js

import React from 'react';

const CustomerActionsMenu = ({ customer, handleEdit, handleShow, openDeleteModal, openRestoreModal }) => {
    // Vérifie si le client est désactivé
    if (customer.deleted_at) {
        return null; // Ne rien afficher si le client est désactivé
    }

    // Si le client est actif, afficher le menu déroulant
    return (
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
    );
};

export default CustomerActionsMenu;

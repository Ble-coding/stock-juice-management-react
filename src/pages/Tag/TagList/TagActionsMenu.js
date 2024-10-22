import React from 'react';

const TagActionsMenu = ({ tag, handleEdit, handleShow, openDeleteModal }) => {
    if (tag.deleted_at) {
        return null; // Ne rien afficher si le tag est désactivé
    }

    return (
        <div className="dropdown">
            <button 
                className="dropdown-toggle btn btn-icon btn-trigger" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
                aria-label="More actions"
            >
                <em className="icon ni ni-more-h"></em>
            </button>
            <div className="dropdown-menu dropdown-menu-end">
                <ul className="link-list-opt no-bdr">
                    {/* Si le tag est actif, afficher les options d'édition, d'affichage et de suppression */}
                    <li>
                        <button 
                            type="button" 
                            className="dropdown-item" 
                            onClick={() => handleEdit(tag.id)}
                        >
                            <em className="icon ni ni-edit"></em>
                            <span>Edit</span>
                        </button>
                    </li>
                    <li>
                        <button 
                            type="button" 
                            className="dropdown-item" 
                            onClick={() => handleShow(tag.id)}
                        >
                            <em className="icon ni ni-eye"></em>
                            <span>Show</span>
                        </button>
                    </li>
                    <li>
                        <button 
                            type="button" 
                            className="dropdown-item" 
                            onClick={() => openDeleteModal(tag.id)}
                        >
                            <em className="icon ni ni-trash"></em>
                            <span>Delete</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default TagActionsMenu;

// src/components/ProductActionsMenu.js

import React from 'react';

const ProductActionsMenu = ({ product, handleEdit, handleShow, openDeleteModal }) => {
    // Si le produit est désactivé ou supprimé, vous pouvez le gérer ici
    if (!product) {
        return null; // Ne rien afficher si le produit n'existe pas
    }

    // Si le produit est actif, afficher le menu d'actions
    return (
        <div className="dropdown">
            <a href="#" className="dropdown-toggle btn btn-icon btn-trigger" data-bs-toggle="dropdown">
                <em className="icon ni ni-more-h"></em>
            </a>
            <div className="dropdown-menu dropdown-menu-end">
                <ul className="link-list-opt no-bdr">
                    <li>
                        <a href="#" onClick={() => handleEdit(product.id)}>
                            <em className="icon ni ni-edit"></em>
                            <span>Edit Product</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" onClick={() => handleShow(product.id)}>
                            <em className="icon ni ni-eye"></em>
                            <span>View Product</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <em className="icon ni ni-activity-round"></em>
                            <span>Product Orders</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" onClick={() => openDeleteModal(product.id)}>
                            <em className="icon ni ni-trash"></em>
                            <span>Remove Product</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ProductActionsMenu;

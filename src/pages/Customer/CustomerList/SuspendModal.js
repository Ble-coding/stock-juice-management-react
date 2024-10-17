import React from 'react';

const SuspendModal = ({ customerToRestore, handleRestore }) => {
  return (
    <div className="modal fade" tabIndex="-1" id="modalAlert3">
    <div className="modal-dialog" role="document">
    <div className="modal-content">
        <div className="modal-body modal-body-lg text-center">
        <div className="nk-modal">
            <em className="nk-modal-icon icon icon-circle icon-circle-xxl ni ni-alert bg-warning"></em>
            <h4 className="nk-modal-title">Are You Sure?</h4>
            <div className="nk-modal-text">
            <div className="caption-text">
                Are you sure you want to restore this record of l'ID <strong>{customerToRestore}</strong>? This action cannot be undone.
            </div>
            </div>
            <div className="nk-modal-action mt-5 d-flex justify-content-between">
            <button
                onClick={handleRestore}
                className="btn btn-lg btn-mw btn-danger"
                data-bs-dismiss="modal"
            >
                Confirm
            </button>

            {/* <button onClick={() => handleDelete(customerToDelete)}>Confirmer</button> */}


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
  );
};

export default SuspendModal;

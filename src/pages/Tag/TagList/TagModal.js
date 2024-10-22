import React from 'react';

const TagModal = ({ tagToDelete, handleDelete }) => {
  return (
    <div className="modal fade" tabIndex="-1" id="modalAlert2">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-body modal-body-lg text-center">
            <div className="nk-modal">
              <em className="nk-modal-icon icon icon-circle icon-circle-xxl ni ni-alert bg-warning"></em>
              <h4 className="nk-modal-title">Are You Sure?</h4>
              <div className="nk-modal-text">
                <div className="caption-text">
                  {tagToDelete ? (
                    <>
                      Are you sure you want to delete this tag with ID <strong>{tagToDelete}</strong>? This action cannot be undone.
                    </>
                  ) : (
                    "No tag selected for deletion."
                  )}
                </div>
              </div>
              <div className="nk-modal-action mt-5 d-flex justify-content-between">
                <button
                  onClick={handleDelete}
                  className="btn btn-lg btn-mw btn-danger"
                  data-bs-dismiss="modal"
                  disabled={!tagToDelete} // Disable if no tag is selected
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
              <p><strong>Confirm</strong> to proceed or <strong>Cancel</strong> to dismiss.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagModal;

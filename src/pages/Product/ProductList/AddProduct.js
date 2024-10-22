import React from 'react';

const AddProduct = () => {
  return (
    <div className="nk-add-product toggle-slide toggle-slide-right" data-content="addProduct" data-toggle-screen="any" data-toggle-overlay="true" data-toggle-body="true" data-simplebar>
      <div className="nk-block-head">
        <div className="nk-block-head-content">
          <h5 className="nk-block-title">New Product</h5>
          <div className="nk-block-des">
            <p>Add information and add new product.</p>
          </div>
        </div>
      </div>
      <div className="nk-block">
        <div className="row g-3">
          <div className="col-12">
            <div className="form-group">
              <label className="form-label" htmlFor="product-title">Product Title</label>
              <div className="form-control-wrap">
                <input type="text" className="form-control" id="product-title" />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="form-label" htmlFor="regular-price">Regular Price</label>
              <div className="form-control-wrap">
                <input type="number" className="form-control" id="regular-price" />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="form-label" htmlFor="sale-price">Sale Price</label>
              <div className="form-control-wrap">
                <input type="number" className="form-control" id="sale-price" />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="form-label" htmlFor="stock">Stock</label>
              <div className="form-control-wrap">
                <input type="text" className="form-control" id="stock" />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="form-label" htmlFor="SKU">SKU</label>
              <div className="form-control-wrap">
                <input type="text" className="form-control" id="SKU" />
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="form-group">
              <label className="form-label" htmlFor="category">Category</label>
              <div className="form-control-wrap">
                <input type="text" className="form-control" id="category" />
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="form-group">
              <label className="form-label" htmlFor="tags">Tags</label>
              <div className="form-control-wrap">
                <input type="text" className="form-control" id="tags" />
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="upload-zone small bg-lighter my-2">
              <div className="dz-message">
                <span className="dz-message-text">Drag and drop file</span>
              </div>
            </div>
          </div>
          <div className="col-12">
            <button className="btn btn-primary">
              <em className="icon ni ni-plus"></em><span>Add New</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;

// src/components/NotFound.js

import React from 'react';

const NotFound = () => {
  return (
    <div className="nk-app-root">
      {/* Main Section */}
      <div className="nk-main">
        {/* Wrap Section */}
        <div className="nk-wrap nk-wrap-nosidebar">
          {/* Content Section */}
          <div className="nk-content">
            <div className="nk-block nk-block-middle wide-xs mx-auto">
              <div className="nk-block-content nk-error-ld text-center">
                <h1 className="nk-error-head">404</h1>
                <h3 className="nk-error-title">Oops! Why you’re here?</h3>
                <p className="nk-error-text">
                  We are very sorry for the inconvenience. It looks like you’re trying to access a page that either has been deleted or never existed.
                </p>
                <a href="/" className="btn btn-lg btn-primary mt-2">Back To Home</a>
              </div>
            </div>
            {/* End of nk-block */}
          </div>
          {/* End of Content Section */}
        </div>
        {/* End of Wrap Section */}
      </div>
      {/* End of Main Section */}
    </div>
  );
};

export default NotFound;

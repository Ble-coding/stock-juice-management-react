import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
      const token = sessionStorage.getItem('token');
      if (token) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    }, []);

    if (!authenticated) {
      return <Redirect to="/login" />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;

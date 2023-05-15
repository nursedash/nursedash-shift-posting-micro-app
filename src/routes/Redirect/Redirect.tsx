import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

const Redirect = (): ReactJSXElement => {
  const navigate = useNavigate();
  const { redirect} = useParams();

  useEffect(() => {
    if (redirect === 'create') {
      navigate('/shifts/create');
    } else if (redirect === 'copy') {
      console.log('copy');
    }
  }, [redirect, navigate]);


  // TODO: Potentially add a spinner here
  return <div>Redirecting</div>
}

export default Redirect;
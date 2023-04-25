import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

const Redirect = (): ReactJSXElement => {
  const navigate = useNavigate();
  const { redirect} = useParams();

  useEffect(() => {
    if (redirect === 'create') {
      navigate('/shifts');
    }
  }, [redirect, navigate]);


  // TODO: Potentially add a spinner here
  return <div>Hey redirect</div>
}

export default Redirect;
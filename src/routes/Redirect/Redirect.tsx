import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { shiftActions } from '../../shared/redux/shift/slice';
import useAppDispatch from '../../shared/hooks/useAppDispatch';

const Redirect = (): ReactJSXElement => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    redirect,
    shiftId
  } = useParams();

  useEffect(() => {
    if (redirect === 'create') {
      const validShiftId = shiftId != null ? parseInt(shiftId, 10) : 0;
      if (validShiftId > 0)
        dispatch(shiftActions.storeShiftInfoForCopyOrEdit({ id: validShiftId, isEdit: false }));

      navigate('/shifts/create');
    }
  }, [redirect, navigate]);

  // TODO: Potentially add a spinner here
  return <div>Redirecting...</div>
}

export default Redirect;
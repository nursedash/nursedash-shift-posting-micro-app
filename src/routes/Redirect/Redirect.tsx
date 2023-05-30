import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { shiftActions } from '../../shared/redux/shift/slice';
import useAppDispatch from '../../shared/hooks/useAppDispatch';
import { coreActions } from '../../shared/redux/core/slice';
import { useAppSelector } from '../../shared/hooks';
import { selectFacility } from '../../shared/redux/facility/slice';

const Redirect = (): ReactJSXElement => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const {
    redirect,
    shiftId,
    token,
    facility: facilityId
  } = useParams();
  const facilityIdFromRoute = facilityId !== undefined && facilityId != null ? parseInt(facilityId) : 0;
  const { id: facilityIdFromAsync } = useAppSelector(selectFacility);

  useEffect(() => {
    if (redirect === 'create' && loaded) {
      const validShiftId = shiftId != null ? parseInt(shiftId, 10) : 0;
      if (validShiftId > 0)
        dispatch(shiftActions.storeShiftInfoForCopyOrEdit({ id: validShiftId, isEdit: false }));

      navigate('/shifts/create');
    }
  }, [redirect, loaded]);

  useEffect(() => {
    dispatch(coreActions.storeCoreDataAsync({token: token ?? '', facilityId: facilityIdFromRoute ?? 0, role: 'facility'}));
  }, [facilityIdFromRoute])

  useEffect(() => {
    if (facilityIdFromAsync > 0) setLoaded(true);
  }, [facilityIdFromAsync])

  // TODO: Potentially add a spinner here
  return <div>Redirecting...</div>
}

export default Redirect;
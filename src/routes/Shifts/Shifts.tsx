import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../../shared/hooks';
import { coreActions, selectTokenStorageStatus } from '../../shared/redux/core/slice';
import useAppDispatch from '../../shared/hooks/useAppDispatch';

const Shifts: React.FC = () => {
  const tokenStoredStatus = useAppSelector(selectTokenStorageStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (tokenStoredStatus === false) {
      dispatch(coreActions.storeCoreDataAsync({token: '', facilityId: 0, role: 'facility'}))
    }
  }, [])

  return <Outlet />;
};

export default Shifts;

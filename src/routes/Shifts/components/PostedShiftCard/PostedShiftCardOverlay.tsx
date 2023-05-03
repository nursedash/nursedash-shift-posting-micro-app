import React, { useState } from 'react';
import { Box, IconButtonProps, Stack, Typography } from '@mui/material';
import { DeleteForever, Edit, FileCopy } from '@mui/icons-material';
import useAppDispatch from '../../../../shared/hooks/useAppDispatch';
import { shiftActions } from '../../../../shared/redux/shift/slice';
import IconButtonWithTooltip from '../../../../shared/components/IconButtonWithTooltip/IconButtonWithTooltip';
import CancelShiftDialog from './CancelShiftDialog';

interface PostedShiftCardOverlayProps {
  shiftId: number;
  status: string;
}

const iconButtonStyles: IconButtonProps = {
  size: 'large',
  sx: {
    backgroundColor: '#fff',
    ':hover': {
      backgroundColor: '#e0e0e0'
    }
  }
}

const PostedShiftCardOverlay: React.FC<PostedShiftCardOverlayProps> = ({ shiftId, status }) => {
  const dispatch = useAppDispatch();
  const isCancelled = status === 'cancelled';
  const [isOpenCancelShiftDialog, setIsOpenCancelShiftDialog] = useState<boolean>(false);

  const setShiftIdToCopy = (id: number): void => {
    dispatch(shiftActions.storeShiftInfoForCopyOrEdit({
      id,
      isEdit: false,
    }));
  }

  const handleEditShift = (id: number): void => {
    dispatch(shiftActions.storeShiftInfoForCopyOrEdit({
      id,
      isEdit: true
    }));
  }

  const handleCancelShift = (id: number): void => {
    dispatch(shiftActions.cancelShiftAsync({id}));
  }

  return (
    <Box
      className="overlay"
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        opacity: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'opacity 0.5s',
        zIndex: 1,
      }}
    >
      {
        isCancelled ?
          <Typography variant='h5' color='error' fontWeight='bold'>CANCELLED</Typography>
            : <Stack direction="row" spacing={4}>
            <IconButtonWithTooltip
              iconBtnProps={{
                ...iconButtonStyles,
                onClick: () => setShiftIdToCopy(shiftId)
              }}
              tooltipText='Copy'
              icon={FileCopy}
            />
            <IconButtonWithTooltip
              iconBtnProps={{
                ...iconButtonStyles,
                onClick: () => handleEditShift(shiftId)
              }}
              tooltipText='Edit'
              icon={Edit}
            />
            <IconButtonWithTooltip
              iconBtnProps={{
                color: 'error',
                ...iconButtonStyles,
                onClick: () => setIsOpenCancelShiftDialog(true)
              }}
              tooltipText='Cancel'
              icon={DeleteForever}
            />
          </Stack>
      }
      <CancelShiftDialog
        isOpen={isOpenCancelShiftDialog}
        setIsOpen={setIsOpenCancelShiftDialog}
        confirmAction={() => handleCancelShift(shiftId)}
      />
    </Box>
  );
};

export default PostedShiftCardOverlay;
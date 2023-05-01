import React from 'react';
import { Box, IconButton, IconButtonProps, Stack } from '@mui/material';
import { DeleteForever, Edit, FileCopy } from '@mui/icons-material';
import useAppDispatch from '../../../../shared/hooks/useAppDispatch';
import { shiftActions } from '../../../../shared/redux/shift/slice';

interface PostedShiftCardOverlayProps {
  shiftId: number;
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

const PostedShiftCardOverlay: React.FC<PostedShiftCardOverlayProps> = ({ shiftId }) => {
  const dispatch = useAppDispatch();

  const setShiftIdToCopy = (id: number): void => {
    dispatch(shiftActions.setSelectedShiftIdToCopy(id));
  }

  const handleCancelShift = (id: number): void => {
    dispatch(shiftActions.cancelShiftAsync({id}));
  }

  const handleEditShift = (): void => {
    console.log('edit');
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
        transition: 'opacity 0.3s',
        zIndex: 1,
      }}
    >
      <Stack direction="row" spacing={4}>
        <IconButton
          {...iconButtonStyles}
          color="primary"
          aria-label="copy"
          onClick={() => setShiftIdToCopy(shiftId)}
        >
          <FileCopy fontSize='large' />
        </IconButton>
        <IconButton
          {...iconButtonStyles}
          color='primary'
          aria-label="edit"
          size='large'
          onClick={handleEditShift}
        >
          <Edit fontSize='large' />
        </IconButton>
        <IconButton
          {...iconButtonStyles}
          color='error'
          aria-label="delete"
          size='large'
          onClick={() => handleCancelShift(shiftId)}
        >
          <DeleteForever fontSize='large' />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default PostedShiftCardOverlay;
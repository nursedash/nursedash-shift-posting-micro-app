import React from 'react';
import { Chip, ChipProps } from '@mui/material';

interface CustomMUIChipProps extends ChipProps {}

const CustomMUIChip: React.FC<CustomMUIChipProps> = (props) => {
  return (
    <Chip
      sx={{
        border: '2px solid',
        fontWeight: 'bold',
        borderRadius: '5px',
      }}
      { ...props}
      label={ props?.label?.toString().toUpperCase() }
      variant='outlined'
    />
  );
};

export default CustomMUIChip;
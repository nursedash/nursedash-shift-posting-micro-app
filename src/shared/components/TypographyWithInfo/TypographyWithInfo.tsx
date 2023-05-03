import React from 'react';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { Icon } from '@mui/material';

interface TypographyWithInfoProps {
  infoText: string;
  typographyText: string;
  typographyVariant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2';
}

const TypographyWithInfo: React.FC<TypographyWithInfoProps> = ({typographyText, infoText, typographyVariant}): ReactJSXElement => {
  return (
    <div style={{ display: 'flex', marginBottom: '16px' }}>
      <Typography variant={typographyVariant} mr={2}>
        {typographyText}
      </Typography>
      <Tooltip title={infoText}>
        <Icon color='primary'>
          <InfoOutlinedIcon />
        </Icon>
      </Tooltip>
    </div>
  );
};

export default TypographyWithInfo;
import React from 'react';
import { IconButton, IconButtonProps, SvgIconTypeMap } from '@mui/material';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import Tooltip from '@mui/material/Tooltip';
import { OverridableComponent } from '@mui/material/OverridableComponent';

export interface IconButtonWithTooltipProps {
  iconBtnProps: IconButtonProps;
  tooltipText: string;
  icon:  OverridableComponent<SvgIconTypeMap> & {muiName: string};
}

const IconButtonWithTooltip: React.FC<IconButtonWithTooltipProps> = ({ iconBtnProps, tooltipText, icon }): ReactJSXElement => {
  const Icon = icon;
  return (
    <Tooltip title={tooltipText} placement='top'>
      <IconButton
        color="primary"
        {...iconBtnProps}
        aria-label={tooltipText}
      >
        <Icon fontSize='large' />
      </IconButton>
    </Tooltip>
  )
}

export default IconButtonWithTooltip;
import React from 'react';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { Card, Grid, Typography } from '@mui/material';
import TypographyWithInfo from '../../../components/TypographyWithInfo';
import CreateShiftForm from './CreateShiftForm';

const CreateShift: React.FC = (): ReactJSXElement => {
  return (
    <Grid container direction="row" spacing={4} alignItems="top" justifyContent="center" >
      <Grid item xs={6}>
        <Typography variant='h4' mb={2}>
          New Shift
        </Typography>
        <Card>
          <CreateShiftForm />
        </Card>
      </Grid>
      <Grid item xs={4}>
        <TypographyWithInfo
          typographyVariant='h4'
          infoText='These are the shifts you have posted in this session. If you refresh your browser, these shifts will disappear.'
          typographyText='Posted Shifts'
        />
      </Grid>
    </Grid>
  );
};

export default CreateShift;
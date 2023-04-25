import React from 'react';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { useAppSelector } from '../../shared/hooks';
import { selectFacilityQualifications, selectFacilityUnits } from '../../shared/redux/facility/slice';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import TypographyWithInfo from '../../components/TypographyWithInfo';

// interface BreakOption {
//   id: number;
//   name: string;
// }
//
// const breakOptions: BreakOption[] = [
//   { id: 0, name: 'No Break' },
//   { id: 15, name: '15 Minutes' },
//   { id: 30, name: '30 Minutes' },
//   { id: 45, name: '45 Minutes' },
//   { id: 60, name: '1 Hour' },
// ];

const CreateShift = (): ReactJSXElement => {
  const allUnits = useAppSelector(selectFacilityUnits);
  const allQualifications = useAppSelector(selectFacilityQualifications);

  console.log(allUnits);
  console.log(allQualifications);
  return (
    <Grid container direction="row" spacing={3} alignItems="center" justifyContent="center" >
      <Grid item xs={6}>
        <Typography variant='h4' mb={2}>
          New Shift
        </Typography>
        <Card>
          <CardContent>
            Hey
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <TypographyWithInfo
          typographyVariant='h4'
          infoText='This is where you can see all the shifts you have posted in this session. If you refresh your browser, these shifts will disappear.'
          typographyText='Posted Shifts'
        />
        <Card>
          <CardContent>
            We posted these
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default CreateShift;
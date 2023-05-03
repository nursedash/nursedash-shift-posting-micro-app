import React from 'react';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { Card, Grid, Typography } from '@mui/material';
import TypographyWithInfo from '../../../shared/components/TypographyWithInfo/TypographyWithInfo';
import CreateShiftForm from './CreateShiftForm';
import { useAppSelector } from '../../../shared/hooks';
import { selectPostedOrEditedShifts, selectShiftInfoForCopyOrEdit } from '../../../shared/redux/shift/slice';
import PostedShiftCard from '../components/PostedShiftCard/PostedShiftCard';
import uuid from 'react-uuid';

const CreateShift: React.FC = (): ReactJSXElement => {
  const postedShifts = useAppSelector(selectPostedOrEditedShifts);
  const shiftToCopyOrEdit = useAppSelector(selectShiftInfoForCopyOrEdit);
  const { isEdit }: { isEdit: boolean } = shiftToCopyOrEdit;
  const pageTitle = isEdit ? 'Edit Shift' : 'Create Shift';

  return (
    <Grid container direction="row" spacing={4} alignItems="top" justifyContent="center" >
      <Grid item xs={6}>
        <Typography variant='h4' mb={2}>
          { pageTitle }
        </Typography>
        <Card>
          <CreateShiftForm />
        </Card>
      </Grid>
      <Grid item xs={5}>
        <TypographyWithInfo
          typographyVariant='h4'
          infoText='These are the shifts you have posted or edited in this session. If you refresh your browser, these shifts will disappear.'
          typographyText='Posted/Edited Shifts'
        />
        {
          postedShifts.map((s) => <PostedShiftCard key={uuid()} shift={s.shift} sessionStatus={s.status} />)
        }
      </Grid>
    </Grid>
  );
};

export default CreateShift;
import React, { useState } from 'react';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
// import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  CardActions,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select, TextField,
  Typography
} from '@mui/material';
import { useAppSelector } from '../../../shared/hooks';
import {
  selectFacilityQualifications,
  selectFacilityUnitsAndTypes, Type
} from '../../../shared/redux/facility/slice';
import uuid from 'react-uuid';
import { NewShift } from '../../../shared/redux/shift/types';
import { DateTimePicker } from '@mui/x-date-pickers';

const newShift: NewShift = {
  unit: null,
  name: '',
  breakDuration: 0,
  type: '',
  startDateTime: null,
  endDateTime: null,
  qualifications: [],
  description: ''
}

interface BreakOption {
  id: number;
  name: string;
}

const breakOptions: BreakOption[] = [
  { id: 0, name: 'No Break' },
  { id: 15, name: '15 Minutes' },
  { id: 30, name: '30 Minutes' },
  { id: 45, name: '45 Minutes' },
  { id: 60, name: '1 Hour' },
];

const CreateShiftForm: React.FC = (): ReactJSXElement => {
  const unitsAndTypes = useAppSelector(selectFacilityUnitsAndTypes);
  const allowedQualifications = useAppSelector(selectFacilityQualifications);
  const [shift, setShift] = useState<NewShift>(Object.create({
    ...newShift,
    unit: unitsAndTypes.length === 1 ? unitsAndTypes[0].unitId : '',
  }));
  const [types, setTypes] = useState<Type[]>((shift.unit !== '') ? unitsAndTypes.find(ut => ut.unitId === shift.unit)?.types ?? [] : []);

  return (
    <>
      <CardContent>
        <Box
          p={2}
        >
          <Typography color='grey' mb={3}>Please enter the details of your new shift below.</Typography>
          <Box
            component='form'
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              '& > *:not(:last-child)': {
                marginBottom: '12px',
              },
            }}
          >
            <FormControl>
              <InputLabel>Unit</InputLabel>
              <Select
                fullWidth
                placeholder='Unit'
                value={shift.unit}
                label='Unit'
                onChange={(e) => {
                  const unit = unitsAndTypes.find(ut => ut.unitId === e.target.value);
                  const types = unit?.types ?? []
                  setShift({ ...shift, unit: unit?.unitId ?? '', type: types.length === 1 ? types[0].type : '' });
                  setTypes(types);
                }}
              >
                {unitsAndTypes.map((ut) => (
                  <MenuItem key={uuid()} value={ut.unitId}>{ut.unitName}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel>Type</InputLabel>
              <Select
                fullWidth
                placeholder='Type'
                value={shift.type}
                label='Type'
                onChange={(e) => {
                  const type = e.target.value ?? '';
                  setShift({ ...shift, type, qualifications: types.find(t => t.type === type)?.defaultShiftQualifications ?? []});
                }}
              >
                {types.map((t) => (
                  <MenuItem key={uuid()} value={t.type}>{t.type}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <DateTimePicker
                label='Start Date/Time'
                value={shift.startDateTime}
                onChange={(e) => { setShift({ ...shift, startDateTime: e }) }}

              />
            </FormControl>
            <FormControl>
              <DateTimePicker
                label='End Date/Time'
                value={shift.endDateTime}
                onChange={(e) => { setShift({ ...shift, endDateTime: e }) }}
              />
            </FormControl>
            <FormControl>
              <TextField
                id="outlined-multiline-static"
                label='Shift Description'
                multiline
                rows={4}
                value={types.find(t => t.type === shift.type)?.defaultShiftDescription ?? ''}
                helperText='Provide any specialty requirements, desired expertise or instructions if any.'
                onChange={(e) => { setShift({ ...shift, description: e.target.value }) }}
              />
            </FormControl>
            <FormControl>
              <InputLabel>Required Qualification(s)</InputLabel>
              <Select
                multiple
                fullWidth
                placeholder='Required Qualification(s)'
                value={shift.qualifications}
                label='Required Qualification(s)'
                onChange={(e) => {
                  setShift({ ...shift, qualifications: [...e.target.value] });
                }}
              >
                {allowedQualifications.map((q) => (
                  <MenuItem key={uuid()} value={q}>{q}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel>Break Time</InputLabel>
              <Select
                fullWidth
                placeholder='Break Time'
                value={shift.breakDuration}
                label='Break Time'
                onChange={(e) => {
                  const breakDuration = parseInt(e.target.value.toString()) ?? 0;
                  setShift({ ...shift, breakDuration });
                }}
              >
                {breakOptions.map((b) => (
                  <MenuItem key={uuid()} value={b.id}>{b.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </CardContent>
      <CardActions>
        <Box p={2} sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={() => setShift(newShift)}>Clear</Button>
          <Button variant="contained">Right Button</Button>
        </Box>
      </CardActions>
    </>

  );
}

export default CreateShiftForm;
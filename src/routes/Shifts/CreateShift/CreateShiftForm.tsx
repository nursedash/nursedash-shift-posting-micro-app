import React, { useEffect, useState } from 'react';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import {
  Box,
  Button,
  CardActions,
  CardContent,
  Link,
  TextField,
  Typography
} from '@mui/material';
import { useAppSelector } from '../../../shared/hooks';
import {
  selectFacilityQualifications,
  selectFacilityUnitsAndTypes, Type
} from '../../../shared/redux/facility/slice';
import { DateTimePicker } from '@mui/x-date-pickers';
import { NewShift } from '../../../shared/gql/shift/types';
import { Controller, SetValueConfig, useForm } from 'react-hook-form';
import useAppDispatch from '../../../shared/hooks/useAppDispatch';
import { selectShiftFromPostedShifts, selectShiftIdToCopy, shiftActions } from '../../../shared/redux/shift/slice';
import SelectRHF from '../../../shared/components/SelectRHF/SelectRHF';
import dayjs from 'dayjs';

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
  const {
    register,
    reset,
    resetField,
    control,
    getValues,
    setValue,
    handleSubmit,
    formState: {
      errors,
      isValid,
      isDirty
    }
  } = useForm<NewShift>();
  const cleanDateTime = (propName: 'startDateTime' | 'endDateTime'): string =>
    typeof getValues(propName) === 'string' ? getValues(propName) as unknown as string : getValues(propName).toISOString();


  const handleFormReset = (): void => {
    reset();
    dispatch(shiftActions.resetShiftIdToCopy());
  }

  const onSubmit = handleSubmit((data) => {
    const startDateTime = cleanDateTime('startDateTime');
    const endDateTime = cleanDateTime('endDateTime');
    dispatch(shiftActions.postShiftDataAsync({
      ...data,
      startDateTime,
      endDateTime
    }));
    handleFormReset()
  });

  const unitsAndTypes = useAppSelector(selectFacilityUnitsAndTypes);
  const allowedQualifications = useAppSelector(selectFacilityQualifications);
  const shiftIdToCopy = useAppSelector(selectShiftIdToCopy);
  const [types, setTypes] = useState<Type[]>([]);
  const dispatch = useAppDispatch();
  const shiftToCopy = useAppSelector(selectShiftFromPostedShifts(shiftIdToCopy));

  const handleUnitChange = (e: React.ChangeEvent<{ value: string }>): void => {
    resetField('type', { defaultValue: '' })
    setTypes(getTypes(parseInt(e.target.value)));
  }

  const getTypes = (unitId: number): Type[] => {
    const unit = unitsAndTypes.find(ut => ut.unitId === unitId);
    return unit?.types ?? [];
  }

  const handleTypeChange = (e: React.ChangeEvent<{ value: string }>): void => {
    const type = e.target.value ?? '';
    const qualifications = types.find(t => t.type === type)?.defaultShiftQualifications;
    if (qualifications != null && qualifications.length > 0) setValue('qualifications', qualifications);
  }

  useEffect(() => {
    if (shiftIdToCopy === 0 || shiftToCopy === undefined) return;
    const setValueConfig: SetValueConfig = {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    };

    setTypes(getTypes(shiftToCopy.unit));
    setValue('unit', shiftToCopy.unit, setValueConfig);
    setValue('type', shiftToCopy.type, setValueConfig);
    setValue('startDateTime', dayjs(shiftToCopy.start_time), setValueConfig);
    setValue('endDateTime', dayjs(shiftToCopy.end_time), setValueConfig);
    setValue('qualifications', shiftToCopy.qualifications, setValueConfig);
    setValue('breakDuration', shiftToCopy.breakTime, setValueConfig);
    setValue('description', shiftToCopy.description, setValueConfig);
  }, [shiftIdToCopy, errors, shiftToCopy, setValue]);

  return (
    <form onSubmit={onSubmit}>
      <CardContent>
        <Box
          p={2}
        >
          <Typography color='grey' mb={3}>Please enter the details of your new shift below.</Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              '& > *:not(:last-child)': {
                marginBottom: '16px',
              },
            }}
          >
            { unitsAndTypes.length > 0 &&
              <SelectRHF
                controllerProps={{
                  name: 'unit',
                  defaultValue: '',
                  rules: {
                    required: true,
                    onChange: handleUnitChange
                  },
                  control,
                }}
                inputLabel='Unit'
                selectOptions={ unitsAndTypes.map((ut) => {
                  return { label: ut.unitName, value: ut.unitId }
                })}
              />
            }
            <SelectRHF
              controllerProps={{
                name: 'type',
                defaultValue: '',
                rules: {
                  required: true,
                  onChange: handleTypeChange
                },
                control,
              }}
              inputLabel='Type'
              selectOptions={types.map((t) => {
                return { label: t.type, value: t.type }
              })}
            />
            <Controller
              name='startDateTime'
              control={control}
              rules={{
                required: true
              }}
              render={({ field: {ref, value, ...field} }) => (
                <DateTimePicker
                  label='Start Date/Time'
                  value={value ?? null}
                  onChange={(date) => field.onChange(date?.toISOString())}
                  inputRef={ref}
                />
              )}
            />
            <Controller
              name='endDateTime'
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: {ref, value, ...field} }) => (
                <DateTimePicker
                  label='End Date/Time'
                  value={value ?? null}
                  onChange={(date) => field.onChange(date?.toISOString())}
                  inputRef={ref}
                />
              )}
            />
            <TextField
              label='Shift Description'
              multiline
              rows={4}
              defaultValue={types.find(t => t.type === getValues('type'))?.defaultShiftDescription ?? ''}
              helperText='Provide any specialty requirements, desired expertise or instructions, if any.'
              {...register('description', { required: true })}
            />
            <SelectRHF
              controllerProps={{
                name: 'qualifications',
                defaultValue: [],
                control,
              }}
              inputLabel='Required Qualification(s)'
              isMulti={true}
              helperText='Select any qualifications required for this shift, if any.'
              selectOptions={allowedQualifications.map((q) => (
                { label: q, value: q }
              ))}
            />
            <SelectRHF
              controllerProps={{
                name: 'breakDuration',
                defaultValue: '',
                control,
              }}
              inputLabel='Break Time'
              selectOptions={breakOptions.map((b) => (
                { label: b.name, value: b.id }
              ))}
            />
            <Typography color='grey' fontSize={12}>
              {`By posting this shift, you are agreeing to NurseDash's `}
              <Link href={'https://nursedash.com/terms-conditions/'}>terms of service</Link>
              {` and `}
              <Link href={'https://nursedash.com/privacy-policy/'}>privacy policy</Link>
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardActions>
        <Box p={2} sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
          <Button disabled={!isDirty} onClick={handleFormReset}>Clear</Button>
          <Button type='submit' variant="contained" disabled={!isValid}>Post Shift</Button>
        </Box>
      </CardActions>
    </form>
  );
}

export default CreateShiftForm;
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
  selectFacilityTimezone,
  selectFacilityUnitsAndTypes
} from '../../../shared/redux/facility/slice';
import { NewShift, ShiftInfoForCopyOrEdit } from '../../../shared/gql/shift/types';
import { SetValueConfig, useForm } from 'react-hook-form';
import useAppDispatch from '../../../shared/hooks/useAppDispatch';
import { selectShiftFromPostedOrEditedShifts, selectShiftInfoForCopyOrEdit, shiftActions } from '../../../shared/redux/shift/slice';
import SelectRHF from '../../../shared/components/SelectRHF/SelectRHF';
import dayjs from 'dayjs';
import DateTimePickerRHF from '../../../shared/components/DateTimePickerRHF/DateTimePickerRHF';
import uuid from 'react-uuid';
import LongShiftDialog from './LongShiftDialog';
import { Type } from '../../../shared/gql/facility/types';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc)
dayjs.extend(timezone);

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
  const facilityTz = useAppSelector(selectFacilityTimezone)
  dayjs.tz.setDefault(facilityTz);
  const unitsAndTypes = useAppSelector(selectFacilityUnitsAndTypes);
  const allowedQualifications = useAppSelector(selectFacilityQualifications);
  const [types, setTypes] = useState<Type[]>([]);
  const dispatch = useAppDispatch();
  const shiftToCopyOrEdit = useAppSelector(selectShiftInfoForCopyOrEdit);
  const { isEdit, id }: ShiftInfoForCopyOrEdit = shiftToCopyOrEdit;
  const shiftData = useAppSelector(selectShiftFromPostedOrEditedShifts(id))?.shift;
  const formTitle = isEdit ? 'Please modify your existing shift below' : 'Please enter the details of your new shift below.';
  const submitBtnTxt = isEdit ? 'Submit Change' : 'Post Shift';
  const defaultStartDateTime = dayjs.tz(Date.now()).add(4, 'hour').startOf('hour');
  const defaultEndDateTime = defaultStartDateTime.add(6, 'hour')
  const setValueConfig: SetValueConfig = {
    shouldValidate: true,
    shouldDirty: true,
    shouldTouch: true,
  };
  const [openLongShiftDialog, setOpenLongShiftDialog] = useState<boolean>(false);
  const [waiveLongShiftWarning, setWaiveLongShiftWarning] = useState<boolean>(false);

  const cleanDateTime = (propName: 'startDateTime' | 'endDateTime'): string =>
    typeof getValues(propName) === 'string' ? getValues(propName) as unknown as string : getValues(propName).toISOString();


  const handleFormReset = (): void => {
    reset();
    dispatch(shiftActions.resetShiftInfoToCopyOrEdit());
  }

  const warnOfShiftLength = (startDateTime: string, endDateTime: string): boolean => {
    const isLong = dayjs(endDateTime).diff(dayjs(startDateTime), 'hour') >= 13;
    if (isLong && !waiveLongShiftWarning) {
      setOpenLongShiftDialog(true);
    }

    return isLong;
  }

  const onSubmit = handleSubmit((data) => {
    const startDateTime = cleanDateTime('startDateTime');
    const endDateTime = cleanDateTime('endDateTime');
    if (warnOfShiftLength(startDateTime, endDateTime) && !waiveLongShiftWarning) {
      return;
    }

    const variables = {
      ...data,
      startDateTime,
      endDateTime
    }

    dispatch(isEdit ? shiftActions.updateShiftAsync({id: shiftToCopyOrEdit.id, ...variables}) : shiftActions.postShiftAsync(variables));
    handleFormReset();
    setWaiveLongShiftWarning(false);
  });

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
    const defaultSettings = types.find(t => t.type === type);
    const qualifications = defaultSettings?.defaultShiftQualifications;
    const description = defaultSettings?.defaultShiftDescription;
    if (qualifications != null && qualifications.length > 0) setValue('qualifications', qualifications, { shouldValidate: true });
    if (description != null && description !== '') setValue('description', description, { shouldValidate: true });
  }

  useEffect(() => {
    if (shiftToCopyOrEdit.id === 0 || shiftData === undefined) return;

    setTypes(getTypes(shiftData.unit));
    setValue('unit', shiftData.unit, setValueConfig);
    setValue('type', shiftData.type, setValueConfig);
    setValue('startDateTime', dayjs.utc(shiftData.start_time).tz(), setValueConfig);
    setValue('endDateTime', dayjs.utc(shiftData.end_time).tz(), setValueConfig);
    setValue('qualifications', shiftData.qualifications ?? [], setValueConfig);
    setValue('breakDuration', shiftData.breakTime, setValueConfig);
    setValue('description', shiftData.description, setValueConfig);
  }, [shiftToCopyOrEdit, shiftData]);

  useEffect(() => {
    if (shiftData == null && shiftToCopyOrEdit?.id > 0) dispatch(shiftActions.getOverviewShiftForCopyAsync({ id, isHidden: true }));
  }, [shiftToCopyOrEdit, shiftData]);

  useEffect(() => {
    if (waiveLongShiftWarning) onSubmit()
      .then(() => {})
      .catch((e) => console.log(e));
  }, [waiveLongShiftWarning]);

  return (
    <>
      <form onSubmit={onSubmit}>
        <CardContent>
          <Box
            p={2}
          >
            <Typography color='grey' mb={3}>{formTitle}</Typography>
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
              <DateTimePickerRHF
                error={errors.startDateTime?.message}
                controllerProps={{
                  name: 'startDateTime',
                  control,
                  rules: {
                    required: true
                  },
                  defaultValue: defaultStartDateTime
                }}
                dateTimePickerProps={{
                  label: 'Start Date/Time',
                }}
              />
              <DateTimePickerRHF
                error={errors.endDateTime?.message}
                controllerProps={{
                  name: 'endDateTime',
                  control,
                  rules: {
                    required: true
                  },
                  defaultValue: defaultEndDateTime
                }}
                dateTimePickerProps={{
                  label: 'End Date/Time',
                }}
              />
              <TextField
                // The key is a hack to stop the label from overlapping the potential setValue operation
                key={uuid()}
                label='Shift Description'
                multiline={true}
                rows={4}
                defaultValue={''}
                helperText='Provide any specialty requirements, desired expertise or instructions, if any.'
                {...register('description')}
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
                  defaultValue: 0,
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
            <Button type='submit' variant="contained" disabled={!isValid}>{submitBtnTxt}</Button>
          </Box>
        </CardActions>
      </form>
      <LongShiftDialog isOpen={openLongShiftDialog} setIsOpen={setOpenLongShiftDialog} confirmAction={() => setWaiveLongShiftWarning(true)} />
    </>
  );
}

export default CreateShiftForm;
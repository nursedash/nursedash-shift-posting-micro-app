import React from 'react';
import { DateTimePicker, DateTimePickerProps } from '@mui/x-date-pickers';
import { Controller, ControllerProps, FieldValues } from 'react-hook-form';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { FormControl, FormHelperText } from '@mui/material';

interface DateTimePickerRHFProps<T extends FieldValues> {
  controllerProps: Partial<ControllerProps<T>> & Required<Pick<ControllerProps<T>, 'name' | 'control'>>;
  dateTimePickerProps: DateTimePickerProps<any>;
  error?: string,
}

const DateTimePickerRHF =
  <T extends FieldValues,>({ dateTimePickerProps, controllerProps, error}: DateTimePickerRHFProps<T>)
    : ReactJSXElement => {
      return (
        <Controller
          rules={{
            required: true
          }}
          render={({ field: {ref, value, ...field} }) => (
            <FormControl>
              <DateTimePicker
                disablePast
                value={value ?? null}
                onChange={(date) => field.onChange(date?.toISOString())}
                inputRef={ref}
                {...dateTimePickerProps}
              />
              { error !== null && <FormHelperText error>{error}</FormHelperText> }
            </FormControl>
          )}
          {...controllerProps}
        />
      )};

export default DateTimePickerRHF;
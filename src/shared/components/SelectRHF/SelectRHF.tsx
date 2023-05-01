import React from 'react';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { Controller, ControllerProps, FieldValues } from 'react-hook-form';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import uuid from 'react-uuid';

interface SelectRHFProps<T extends FieldValues> {
  controllerProps: Partial<ControllerProps<T>> & Required<Pick<ControllerProps<T>, 'name'>>;
  inputLabel: string;
  selectOptions: Array<{
    value: string | number;
    label: string;
  }>;
  isMulti?: boolean;
  helperText?: string;
}

const SelectRHF =
  <T extends FieldValues,>({
    controllerProps,
    inputLabel,
    selectOptions,
    helperText = '',
    isMulti = false
  }: SelectRHFProps<T>): ReactJSXElement => {
  const {
    name,
    defaultValue,
    control,
    rules
  } = controllerProps;

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field }) => (
        <FormControl>
          <InputLabel>{inputLabel}</InputLabel>
          <Select
            fullWidth
            placeholder={inputLabel}
            label={inputLabel}
            multiple={isMulti}
            {...field}
          >
            {selectOptions.map((option) => (
              <MenuItem key={uuid()} value={option.value}>{option.label}</MenuItem>
            ))}
          </Select>
          { helperText !== '' && <FormHelperText>Select any qualifications required for this shift, if any.</FormHelperText> }
        </FormControl>
      )}
    />
  );
};

export default SelectRHF;
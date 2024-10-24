import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import { FormControl, FormHelperText, IconButton, OutlinedInput, OutlinedInputProps, Tooltip } from '@mui/material';
import InputLabel from '@/components/InputLabel';
import React, { memo, useCallback } from 'react';

interface AnyErrorObj {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // NOSONAR
}

export type InputProps = Omit<OutlinedInputProps, 'onChange'> & {
  id: string;
  label?: string;
  copyEnabled?: boolean;
  errorMessage?: string | AnyErrorObj;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  onChange?: (val: string) => void;
  helperText?: string;
};

const getEndAdornment = ({
  copyEnabled,
  isError,
  endAdornment,
}: {
  copyEnabled: boolean;
  value?: OutlinedInputProps['value'];
  isError: boolean | undefined;
  endAdornment: React.ReactNode;
}) => {
  if (endAdornment && !isError) return endAdornment;

  if (isError) return <ReportProblemOutlinedIcon color="error" />;
  if (copyEnabled)
    return (
      <Tooltip title="Copy to clipboard">
        <IconButton sx={{ cursor: 'pointer' }}></IconButton>
      </Tooltip>
    );
};

const Input: React.FC<InputProps> = ({
  id,
  value,
  label,
  helperText,
  disabled = false,
  endAdornment,
  copyEnabled = false,
  errorMessage,
  onChange,
  ...rest
}) => {
  const isError = !!errorMessage;
  const handleChangeEvent = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (onChange) onChange(e?.target?.value);
    },
    [onChange]
  );
  return (
    <FormControl sx={{ width: 1 }} data-testid="inputFormControl" error={isError} disabled={disabled}>
      {label && <InputLabel htmlFor={id}>{label}</InputLabel>}
      <OutlinedInput
        disabled={disabled}
        data-testid="input"
        value={value}
        id={id}
        sx={{ marginTop: 2 }}
        inputProps={{
          sx: {
            padding: 1,
          },
        }}
        onChange={handleChangeEvent}
        endAdornment={getEndAdornment({ copyEnabled, value, isError, endAdornment })}
        {...rest}
      />
      {(isError || helperText) && <FormHelperText>{isError ? <>{errorMessage}</> : helperText}</FormHelperText>}
    </FormControl>
  );
};

export default memo(Input);

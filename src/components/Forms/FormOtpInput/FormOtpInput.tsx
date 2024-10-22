import { Box, Typography } from '@mui/material';
import { useFormikContext, FormikValues } from 'formik';
import React, { useCallback, useState } from 'react';
import OtpInput from 'react18-input-otp';

interface InputProps {
  id: string;
  label?: string;
  copyEnabled?: boolean;
  errorMessage?: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  onChange?: (val: string) => void;
  helperText?: string;
}

const FormOtpInput: React.FC<InputProps> = ({ id, ...rest }) => {
  const { setFieldValue, values } = useFormikContext<FormikValues>();
  const [error, setError] = useState<string | null>(null);

  const handleChangeEvent = useCallback(
    (val: string) => {
      setFieldValue(id, val);
      if (val.length !== 6 || !/^\d{6}$/.test(val)) {
        setError('OTP must be exactly 6 digits');
      } else {
        setError(null);
      }
    },
    [id, setFieldValue]
  );

  return (
    <Box>
      <OtpInput
        id={id}
        value={values[id] || ''} // Ensure the value is a string
        isInputNum
        numInputs={6}
        containerStyle={{ justifyContent: 'space-between' }}
        inputStyle={{
          width: '100%',
          margin: '4px',
          padding: '2vh',
          borderRadius: 4,
          border: error ? '1px solid red' : '1px solid #ccc',
        }}
        onChange={handleChangeEvent}
        {...rest}
      />
      {error && (
        <Typography variant="caption" color="error">
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default FormOtpInput;

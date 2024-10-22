import { InputProps } from '@/components/Input/Input';
import { FormikValues, useFormikContext } from 'formik';
import React, { useCallback, useState } from 'react';
import OtpInput from 'react18-input-otp';
import { Box, Typography } from '@mui/material';

const FormOtpInput: React.FC<InputProps> = ({ id, disabled, ...rest }) => {
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
          padding: '1vw',
          borderRadius: 4,
          border: error ? '1px solid red' : '1px solid #ccc',
        }}
        disabled={disabled}
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

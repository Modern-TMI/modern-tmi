import styled from '@emotion/styled';
import { Button, FormControl, OutlinedInput, InputLabel } from '@mui/material';
import React, { ChangeEvent, ReactElement } from 'react';

type IInputType = 'password' | 'text' | 'email' | 'nummber';

interface IProp {
  name: string;
  onChange: (val: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  required?: boolean;
  onBlur?: () => void;
  value: string;
  error?: boolean;
  type?: IInputType;
  endAdornment?: ReactElement;
}

const CommonInput = (props: IProp) => {
  const { error, label } = props;
  return (
    <InputContainer>
      <InputLabel error={error} htmlFor="email">
        {label}
      </InputLabel>
      <Input {...props} />
    </InputContainer>
  );
};

const InputContainer = styled(FormControl)``;

const Input = styled(OutlinedInput)``;

export default CommonInput;

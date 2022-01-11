import styled from '@emotion/styled';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import {
  Button,
  FormHelperText,
  TextField,
  OutlinedInput,
  InputAdornment,
  InputLabel,
  FormControl,
} from '@mui/material';
import { IRegisterUser } from '../../type/user';
import HideButton from '../components/HideButton';

const RegisterPage: React.FC = () => {
  const [registerInfo, setRegisterInfo] = useState<IRegisterUser>({
    email: '',
    nickname: '',
    password: '',
  });

  const [hidePassword, setHidePassword] = useState(true);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(registerInfo);
  };

  const handleChange = (val: ChangeEvent<HTMLInputElement>) => {
    setRegisterInfo({ ...registerInfo, [val.target.name]: val.target.value });
    console.log(registerInfo);
  };

  return (
    <Wrapper>
      <TitleContainer>
        <TitleText>{'회원가입'}</TitleText>
      </TitleContainer>
      <Form onSubmit={handleSubmit}>
        <InputContainer>
          <InputLabel htmlFor="email">{'이메일'}</InputLabel>
          <Input
            name="email"
            onChange={handleChange}
            required
            value={registerInfo?.email}
            label="이메일"
          />
        </InputContainer>
        <InputContainer>
          <InputLabel htmlFor="password">{'비밀번호'}</InputLabel>
          <Input
            required
            name="password"
            onChange={handleChange}
            value={registerInfo?.password}
            type={hidePassword ? 'password' : 'text'}
            label="비밀번호"
            endAdornment={
              <InputAdornment position="end">
                <HideButton
                  onClick={() => {
                    setHidePassword(!hidePassword);
                  }}
                  show={hidePassword}
                />
              </InputAdornment>
            }
          />
        </InputContainer>
        <InputContainer>
          <InputLabel htmlFor="nickname">{'닉네임'}</InputLabel>
          <Input
            required
            name="nickname"
            onChange={handleChange}
            value={registerInfo?.nickname}
            label="닉네임"
          />
        </InputContainer>
        <SubmitButton variant="contained" type="submit">
          {'만들기'}
        </SubmitButton>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleContainer = styled.div``;

const TitleText = styled.h1``;

const Form = styled.form`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  height: 50%;
`;

const InputContainer = styled(FormControl)``;

const Input = styled(OutlinedInput)`
  min-width: 260px;
  width: 100%;
`;

const SubmitButton = styled(Button)`
  width: 50%;
`;

export default RegisterPage;

import styled from '@emotion/styled';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import {
  Button,
  OutlinedInput,
  InputAdornment,
  InputLabel,
  FormControl,
} from '@mui/material';
import HideButton from '../components/HideButton';
import { isEmail } from '../utils/validate';
import CommonInput from '../components/CommonInput';

interface IRegisterUser {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
}

interface IRegisterInputError {
  emailErr: boolean;
  passwordErr: boolean;
  passwordConfirmErr: boolean;
  nicknameErr: boolean;
}

const RegisterPage: React.FC = () => {
  const [registerInfo, setRegisterInfo] = useState<IRegisterUser>({
    email: '',
    nickname: '',
    password: '',
    passwordConfirm: '',
  });
  const [registerInfoErr, setRegisterInfoErr] = useState<IRegisterInputError>({
    emailErr: false,
    passwordErr: false,
    passwordConfirmErr: false,
    nicknameErr: false,
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
        <CommonInput
          name="email"
          onChange={handleChange}
          onBlur={() => {
            if (!isEmail(registerInfo.email)) {
              setRegisterInfoErr({ ...registerInfoErr, emailErr: true });
            }
          }}
          required
          value={registerInfo?.email}
          error={registerInfoErr.emailErr}
          label="이메일"
        />
        <CommonInput
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
        <CommonInput
          required
          name="passwordConfirm"
          onChange={handleChange}
          value={registerInfo?.passwordConfirm}
          type={hidePassword ? 'password' : 'text'}
          label="비밀번호 확인"
          onBlur={() => {
            if (registerInfo.password !== registerInfo.passwordConfirm) {
              console.log('hi');
            }
          }}
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
        <CommonInput
          required
          name="nickname"
          onChange={handleChange}
          value={registerInfo?.nickname}
          label="닉네임"
        />
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

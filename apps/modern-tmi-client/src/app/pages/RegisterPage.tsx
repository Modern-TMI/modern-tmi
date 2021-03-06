import styled from '@emotion/styled';
import React, {
  ChangeEvent,
  FormEvent,
  useState,
  ReactNode,
  useCallback,
} from 'react';
import { Button, OutlinedInput, FormControl, InputLabel } from '@mui/material';
import HideButton from '../../common/components/HideButton';
import { isEmail } from '../../common/utils/validate';

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

type IInputType = 'password' | 'text' | 'email' | 'number';

interface IInputProps {
  name: string;
  onChange: (val: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  required?: boolean;
  onBlur?: () => void;
  value: string;
  error?: boolean;
  type?: IInputType;
  endAdornment?: ReactNode;
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
  };

  const handleChange = (val: ChangeEvent<HTMLInputElement>) => {
    setRegisterInfo({ ...registerInfo, [val.target.name]: val.target.value });
    console.log(registerInfo);
  };

  const checkPasswordConfirm = () => {
    if (registerInfo.password !== registerInfo.passwordConfirm) {
      setRegisterInfoErr({
        ...registerInfoErr,
        passwordConfirmErr: true,
      });
    } else {
      setRegisterInfoErr({
        ...registerInfoErr,
        passwordConfirmErr: false,
      });
    }
  };

  const RegisterInput = useCallback((props: IInputProps) => {
    const { error, label } = props;
    return (
      <InputContainer>
        <InputLabel error={error} htmlFor="email">
          {label}
        </InputLabel>
        <Input {...props} />
      </InputContainer>
    );
  }, []);

  return (
    <Wrapper>
      <TitleContainer>
        <TitleText>{'????????????'}</TitleText>
      </TitleContainer>
      <Form onSubmit={handleSubmit}>
        <RegisterInput
          name="email"
          onChange={handleChange}
          onBlur={() => {
            if (!isEmail(registerInfo.email) && registerInfo.email.length) {
              setRegisterInfoErr({ ...registerInfoErr, emailErr: true });
            } else {
              setRegisterInfoErr({ ...registerInfoErr, emailErr: false });
            }
          }}
          required
          value={registerInfo?.email}
          error={registerInfoErr.emailErr}
          label="?????????"
        />
        <RegisterInput
          required
          name="password"
          onChange={handleChange}
          value={registerInfo?.password}
          type={hidePassword ? 'password' : 'text'}
          label="????????????"
          onBlur={checkPasswordConfirm}
          endAdornment={
            <HideButton
              onClick={() => {
                setHidePassword(!hidePassword);
              }}
              show={hidePassword}
            />
          }
        />
        <RegisterInput
          required
          name="passwordConfirm"
          onChange={handleChange}
          error={registerInfoErr.passwordConfirmErr}
          value={registerInfo?.passwordConfirm}
          type={hidePassword ? 'password' : 'text'}
          label="???????????? ??????"
          onBlur={checkPasswordConfirm}
          endAdornment={
            <HideButton
              onClick={() => {
                setHidePassword(!hidePassword);
              }}
              show={hidePassword}
            />
          }
        />
        <RegisterInput
          required
          name="nickname"
          onChange={handleChange}
          value={registerInfo?.nickname}
          label="?????????"
        />
        <SubmitButton variant="contained" type="submit">
          {'?????????'}
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

const SubmitButton = styled(Button)`
  width: 50%;
`;

const InputContainer = styled(FormControl)`
  min-width: 260px;
  width: 100%;
`;

const Input = styled(OutlinedInput)``;

export default RegisterPage;

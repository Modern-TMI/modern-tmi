import styled from '@emotion/styled';
import React, {
  ChangeEvent,
  FormEvent,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from 'react';
import {
  Button,
  InputAdornment,
  OutlinedInput,
  FormControl,
  InputLabel,
} from '@mui/material';
import HideButton from '../../common/components/HideButton';
import { isEmail } from '../../common/utils/validate';
import { useNavigate } from 'react-router-dom';
import { IUser } from '../../common/type/user';
import userSlice, { loginUser } from '../../common/slices/userSlice';
import {
  useUserDispatch,
  useUserSelector,
} from '../../common/hooks/useUserStore';

interface ILoginInfo {
  email: string;
  password: string;
}

interface ILoginInfoError {
  emailErr: boolean;
  passwordErr: boolean;
}

type IInputType = 'password' | 'text' | 'email' | 'nummber';

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

const LoginPage: React.FC = () => {
  const dispatch = useUserDispatch();
  const userInfo = useUserSelector((state) => state);

  // testCode
  // useEffect(() => {
  //   dispatch(
  //     loginUser({
  //       id: 1,
  //       email: 'khil@airi.kr',
  //       password: '1234',
  //       nickname: 'zidru',
  //       isActive: true,
  //       updatedDate: '',
  //       createdDate: '',
  //     } as IUser)
  //   );
  //   // console.log(userStore.getState());
  // }, []);

  const navigate = useNavigate();

  const [loginInfo, setLoginInfo] = useState<ILoginInfo>({
    email: '',
    password: '',
  });
  const [loginInfoErr, setLoginInfoErr] = useState<ILoginInfoError>({
    emailErr: false,
    passwordErr: false,
  });

  const [hidePassword, setHidePassword] = useState(true);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleChange = (val: ChangeEvent<HTMLInputElement>) => {
    setLoginInfo({ ...loginInfo, [val.target.name]: val.target.value });
    console.log(loginInfo);
  };

  const LoginInput = useCallback((props: IInputProps) => {
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
        <TitleText>{'?????????'}</TitleText>
      </TitleContainer>
      <Form onSubmit={handleSubmit}>
        <LoginInput
          name="email"
          onChange={(e) => {
            handleChange(e);
            if (!isEmail(loginInfo.email) && loginInfo.email.length) {
              setLoginInfoErr({ ...loginInfoErr, emailErr: true });
            } else {
              setLoginInfoErr({ ...loginInfoErr, emailErr: false });
            }
          }}
          required
          value={loginInfo?.email}
          error={loginInfoErr.emailErr}
          label="?????????"
        />
        <LoginInput
          required
          name="password"
          onChange={handleChange}
          value={loginInfo?.password}
          type={hidePassword ? 'password' : 'text'}
          label="????????????"
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
        <LoginButton variant="contained" type="submit">
          {'?????????'}
        </LoginButton>
        <LinkToRegistButton
          onClick={() => {
            navigate('/register');
          }}
          variant="outlined"
          type="button"
        >
          {'????????????'}
        </LinkToRegistButton>
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

const LoginButton = styled(Button)`
  width: 50%;
`;

const LinkToRegistButton = styled(Button)`
  width: 50%;
`;

const InputContainer = styled(FormControl)`
  min-width: 260px;
  width: 100%;
`;

const Input = styled(OutlinedInput)``;

export default LoginPage;

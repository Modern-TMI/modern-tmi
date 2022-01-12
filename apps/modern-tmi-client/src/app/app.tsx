import styled from '@emotion/styled';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <StyledApp>
      {/* <RegisterPage /> */}
      <LoginPage />
    </StyledApp>
  );
}

export default App;

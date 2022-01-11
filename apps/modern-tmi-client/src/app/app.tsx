import styled from '@emotion/styled';
import NxWelcome from './nx-welcome';
import RegisterPage from './pages/RegisterPage';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <StyledApp>
      <RegisterPage />
    </StyledApp>
  );
}

export default App;

import styled from '@emotion/styled';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { Routes, Route, RouteObject } from 'react-router-dom';
import GlobalLayout from './layouts/GlobalLayout';
const StyledApp = styled.div`
  // Your style here
  height: 100%;
`;

export function App() {
  return (
    <StyledApp>
      <Routes>
        <Route path="/" element={<GlobalLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </StyledApp>
  );
}

export default App;

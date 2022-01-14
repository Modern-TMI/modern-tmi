import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import userStore from './common/store/userStore';
import App from './app/app';

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={userStore}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);

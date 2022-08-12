import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

// import Chatbot from 'react-chatbot-kit';
// import ActionProvider from './components/chatbot/ActionProvider';
// import MessageParser from './components/chatbot/MessageParser';
// import config from './components/chatbot/config';

const store = createStore(compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
  <HelmetProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <App />
        {/* <Chatbot
          config={config}
          actionProvider={ActionProvider}
          messageParser={MessageParser}
        /> */}
      </Suspense>
  </HelmetProvider>
</Provider>,
  document.getElementById('root')
);
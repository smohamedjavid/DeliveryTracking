import './env/dev.ts';
import './src/constants/routes.ts';

import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';

import { name as appName } from './app.json';
import App from './src/App';
import { configureStore } from './src/redux';

const store = configureStore();

const AppWithStore = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

global.NETWORK_REQUESTS = {};

// eslint-disable-next-line no-undef
GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
AppRegistry.registerComponent(appName, () => AppWithStore);

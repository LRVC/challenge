import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import {Provider} from 'react-redux';
import { createStore } from 'redux';
import { postData } from './reducers/index';
import { StoreState } from './types/index';

// @ts-ignore
const store = createStore<StoreState>(postData, {
  posts: []
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById('root') as HTMLElement
);
registerServiceWorker();

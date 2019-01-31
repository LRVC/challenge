import * as React from 'react';
import * as ReactDOM from 'react-dom';
import PostsTableContainer from './containers/PostsTableContainer';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import {Provider} from 'react-redux';
import { createStore } from 'redux';
import { postData } from './reducers/index';
import { StoreState } from './types/index';

const store = createStore<StoreState, any, any, any>(postData, {
  posts: [],
  topPostScore: 0
});

ReactDOM.render(
  <Provider store={store}>
    <PostsTableContainer />
  </Provider>,

  document.getElementById('root') as HTMLElement
);
registerServiceWorker();

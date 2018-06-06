import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import api from '../middlewares/api';

const devToolsEnhancer = typeof window !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null; // eslint-disable-line no-underscore-dangle
const composeEnhancers = devToolsEnhancer || compose;

const configureStore = (preloadedState) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(api)),
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;

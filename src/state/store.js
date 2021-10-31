import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'

import reducer from './reducers';

const store = createStore(reducer, applyMiddleware(createSagaMiddleware));

export default store;
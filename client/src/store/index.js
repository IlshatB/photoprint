
import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import reduxThunk from 'redux-thunk'
import clientReducer from './client/reducer'
  
const reducers = combineReducers({ client: clientReducer })
  
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export default createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)))
import { combineReducers } from 'redux';
import { dataReducer } from './appdata';
import { authReducer } from './auth';

export const rootReducer = combineReducers({
  auth: authReducer,
  data: dataReducer,
})

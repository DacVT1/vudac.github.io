import { combineReducers } from "redux";

import { reducer as authReducer } from "./auth";

import * as actionTypes from "./auth/types";

// Combine all reducers.

const appReducer = combineReducers({
  auth: authReducer
});

const rootReducer = (state, action) => {
  if (action.type === actionTypes.LOGOUT_SUCCESS) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;

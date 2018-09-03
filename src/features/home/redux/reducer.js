import initialState from './initialState';
import { reducer as fetchLoginReducer } from './fetchLogin';
import { reducer as fetchGetUserInfoReducer } from './fetchGetUserInfo';
import { reducer as fetchGetUserGroupReducer } from './fetchGetUserGroup';

const reducers = [
  fetchLoginReducer,
  fetchGetUserInfoReducer,
  fetchGetUserGroupReducer,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  /* istanbul ignore next */
  return reducers.reduce((s, r) => r(s, action), newState);
}

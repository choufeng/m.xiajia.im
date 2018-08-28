// This is the root reducer of the feature. It is used for:
//   1. Load reducers from each action in the feature and process them one by one.
//      Note that this part of code is mainly maintained by Rekit, you usually don't need to edit them.
//   2. Write cross-topic reducers. If a reducer is not bound to some specific action.
//      Then it could be written here.
// Learn more from the introduction of this approach:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da.

import initialState from './initialState';
import { reducer as setSideMenuReducer } from './setSideMenu';
import { reducer as setSideSelectedReducer } from './setSideSelected';
import { reducer as fetchGroupListReducer } from './fetchGroupList';
import { reducer as setActiveGroupReducer } from './setActiveGroup';
import { reducer as saveNewGroupReducer } from './saveNewGroup';
import { reducer as setGroupNodesReducer } from './setGroupNodes';
import { reducer as deleteGroupReducer } from './deleteGroup';
import { reducer as clearActiveGroupReducer } from './clearActiveGroup';
import { reducer as saveNewPasswordReducer } from './saveNewPassword';

const reducers = [
  setSideMenuReducer,
  setSideSelectedReducer,
  fetchGroupListReducer,
  setActiveGroupReducer,
  saveNewGroupReducer,
  setGroupNodesReducer,
  deleteGroupReducer,
  clearActiveGroupReducer,
  saveNewPasswordReducer,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  return reducers.reduce((s, r) => r(s, action), newState);
}

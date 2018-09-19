// Initial state is the place you define all initial values for the Redux store of the feature.
// In the 'standard' way, initialState is defined in reducers: http://redux.js.org/docs/basics/Reducers.html
// But when application grows, there will be multiple reducers files, it's not intuitive what data is managed by the whole store.
// So Rekit extracts the initial state definition into a separate module so that you can have
// a quick view about what data is used for the feature, at any time.

// NOTE: initialState constant is necessary so that Rekit could auto add initial state when creating async actions.
const initialState = {
  sideMenu: [],
  setSideMenuPending: false,
  setSideMenuError: null,
  sideSelected: '',
  groupList: [],
  fetchGroupListPending: false,
  fetchGroupListError: null,
  activeGroup: {},
  saveNewGroupPending: false,
  saveNewGroupError: null,
  groupNodes: [],
  setGroupNodesPending: false,
  setGroupNodesError: null,
  deleteGroupPending: false,
  deleteGroupError: null,
  saveNewPasswordPending: false,
  saveNewPasswordError: null,
  updateGroupPending: false,
  updateGroupError: null,
  fetchManagerListPending: false,
  fetchManagerListError: null,
  managerList:[],
  activeManager: {},
  saveNewManagerPending: false,
  saveNewManagerError: null,
  deleteManagerPending: false,
  deleteManagerError: null,
  fetchSaveManagerUpdatePending: false,
  fetchSaveManagerUpdateError: null,
  fetchResetPasswordPending: false,
  fetchResetPasswordError: null
};

export default initialState;

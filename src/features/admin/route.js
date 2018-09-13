// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html
// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html
// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html
import {
  DefaultPage,
  Permission,
  Managers,
} from './';

import AdminLayout from '../common/AdminLayout';

export default {
  path: 'admin',
  name: 'Admin',
  component: AdminLayout,
  childRoutes: [
    { path: 'dashboard', name: 'Default page', component: DefaultPage, isIndex: true },
    { path: 'permission', name: 'Permission', component: Permission },
    { path: 'managers', name: 'Managers', component: Managers }
  ],
};

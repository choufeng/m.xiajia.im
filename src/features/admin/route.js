// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  DefaultPage,
  Layout,
  Permission,
} from './';

export default {
  path: 'admin',
  name: 'Admin',
  component: Layout,
  childRoutes: [
    { path: 'default-page', name: 'Default page', component: DefaultPage, isIndex: true },
    { path: 'permission', name: 'Permission', component: Permission },
  ],
};

// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  DefaultPage,
} from './';
import AdminLayout from '../common/AdminLayout';

export default {
  path: 'category',
  name: 'Category',
  component: AdminLayout,
  childRoutes: [
    { path: 'default-page', name: 'Default page', component: DefaultPage, isIndex: true },
  ],
};

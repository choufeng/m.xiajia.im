import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import {MenuItem, MenuList, Paper, ListItemText} from '@material-ui/core'

export class SidePanel extends Component {
  static propTypes = {
    admin: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props)
    this.state = {
      list: [
        {id: 1, value: 'Home', secondary: 'show me some news'},
        {id: 2, value: '用户管理', secondary: '这是一个简单的介绍'},
        {id: 3, value: 'Admin', secondary: 'show me some news'},
        {id: 4, value: 'Permissions', secondary: '这是一个简单的介绍'},
        {id: 5, value: 'Logout', secondary: 'show me some news'},
      ]
    }
  }

  render() {
    return (
      <div className="admin-side-panel">
        {/* <ul>
          {this.state.list.map((i)=> {return <li>{i.value}</li>}) }
        </ul> */}
        <Paper>
          <MenuList>
            {this.state.list.map((i) => {
              return (
                <MenuItem className='admin-side-panel-item'>
                  <ListItemText className='admin-side-panel-item-text' inset primary={i.value} secondary={i.secondary} />
                </MenuItem>
              )
            })}
          </MenuList>
        </Paper>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    admin: state.admin,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidePanel);

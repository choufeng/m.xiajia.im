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
    this.state = []
  }

  componentDidMount() {
    this.props.actions.setSideMenu()
  }

  render() {
    const {sideMenu} = this.props.admin
    return (
      <div className="admin-side-panel">
        <Paper>
          <MenuList>
            {sideMenu.map((i) => {
              return (
                <MenuItem className='admin-side-panel-item' key={i.id}>
                  <ListItemText className='admin-side-panel-item-text' inset primary={i.title} secondary={i.description} />
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

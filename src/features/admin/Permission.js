import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import {Grid} from '@material-ui/core'
import {GroupList, GroupNodes} from './'
export class Permission extends Component {
  static propTypes = {
    admin: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.actions.setSideSelected('权限管理')
  }

  render() {
    return (
      <div className="admin-permission">
        <Grid container>
          <Grid item xs={3}>
            <GroupList />
          </Grid>
          <Grid item xs={9}>
            <GroupNodes />
          </Grid>
        </Grid>
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
)(Permission);

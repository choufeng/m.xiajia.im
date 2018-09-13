import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Grid } from '@material-ui/core';
import { DeleteManager } from './';

export class ManagerContent extends Component {
  static propTypes = {
    admin: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="admin-manager-content">
        <Grid container>
          <Grid item xs={9} className="admin-manager-content-body">
            <div className="admin-manager-content-title"><b>{ this.props.admin.activeManager.username }</b>的个人资料管理</div>
          </Grid>
          <Grid item xs={3}>
            <div className="admin-manager-content-title">操作</div>
            <div className="admin-group-nodes-buttons">
              <Grid container>
                <Grid item xs={12} className="admin-group-nodes-buttons-item">
                  <DeleteManager />
                </Grid>
              </Grid>
            </div>
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
)(ManagerContent);

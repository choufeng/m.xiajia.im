import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import {SidePanel, TopPanel} from './';
import {Grid} from '@material-ui/core'

export class Layout extends Component {
  static propTypes = {
    admin: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="admin-layout">
        <Grid container spacing={0}>
          <Grid item xs={2} className="admin-layout-left">
            <SidePanel />
          </Grid>
          <Grid item xs={10} className="admin-layout-right">
            <Grid container spacing={0}>
              <Grid item xs={12} className="admin-layout-right-top">
                <TopPanel />
              </Grid>
              <Grid item xs={12} className="admin-layout-right-content">
                {this.props.children}
              </Grid>
            </Grid>
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
)(Layout);

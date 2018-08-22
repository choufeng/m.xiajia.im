import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import {Grid} from '@material-ui/core';

export class TopPanel extends Component {
  static propTypes = {
    admin: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="admin-top-panel">
        <Grid container spacing={16}>
          <Grid item xs={4} className="admin-top-panel-title"><h2>Hello World</h2></Grid>
          <Grid item xs={6} className="admin-top-panel-menu">Fundiid</Grid>
          <Grid item xs={2} className="admin-top-panel-right">Good</Grid>
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
)(TopPanel);

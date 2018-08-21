import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class DefaultPage extends Component {
  static propTypes = {
    admin: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="admin-default-page">
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
        <p>Page Content: admin/DefaultPage </p>
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
)(DefaultPage);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import {withRouter} from 'react-router-dom'
import * as commonActions from '../common/redux/actions'
import { LOGOUT_SUCCESS } from '../../common/consts';

export class Logout extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };
  componentDidMount() {
    this.props.commonActions.showMessageBox(LOGOUT_SUCCESS, 'success')
    this.props.history.replace('/')
  }

  render() {
    return (
      <div className="home-logout">
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
    commonActions: bindActionCreators({...commonActions}, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Logout));

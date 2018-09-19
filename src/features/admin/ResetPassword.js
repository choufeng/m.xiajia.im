import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import * as commonActions from '../common/redux/actions';
import { Button } from '@material-ui/core';
import { RESETPASSWORD_SUCCESS, SUCCESS, FAILURE } from '../../common/consts';
import getErrorMessage from '../../common/getErrorMessage';

export class ResetPassword extends Component {
  static propTypes = {
    admin: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props){
    super(props)
    this.handleResetPassword = this.handleResetPassword.bind(this)
  }

  handleResetPassword() {
    const defaultResetPasswrod = Math.ceil(Math.random() * 199234).toString()
    this.props.actions.fetchResetPassword({id: this.props.admin.activeManager.id, password: defaultResetPasswrod}).then(() => {
      this.props.commonActions.showMessageBox(`${RESETPASSWORD_SUCCESS}:${defaultResetPasswrod}`, SUCCESS)
    }).catch(() => {
      this.props.commonActions.showMessageBox(getErrorMessage(this.props.admin.fetchResetPasswordError), FAILURE)
    })
  }

  render() {
    return (
      <div className="admin-reset-password">
        <Button variant="contained" onClick={this.handleResetPassword} color="primary">重置密码</Button>
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
    actions: bindActionCreators({ ...actions }, dispatch),
    commonActions: bindActionCreators({ ...commonActions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPassword);

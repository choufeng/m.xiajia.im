import React, { Component } from 'react';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField, FormHelperText} from '@material-ui/core'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import * as commonActions from '../common/redux/actions'

export class ChangePassword extends Component {
  static propTypes = {

  };

  constructor(props) {
    super(props)
    this.state = {
      newPass: '',
      confirmPass: '',
      confirmError: '',
      btnStatus: null
    }
    this.handleCancelDialog = this.handleCancelDialog.bind(this)
    this.handleSaveData = this.handleSaveData.bind(this)
    this.handleChangeNewPass = this.handleChangeNewPass.bind(this)
    this.handleChangeConfirmPass = this.handleChangeConfirmPass.bind(this)
  }
  componentDidMount() {
    this.setState({
      btnStatus: true
    })
  }
  handleCancelDialog() {
    this.props.closeDialog()
  }
  handleSaveData() { 
    this.props.actions.saveNewPassword({newPassword: this.state.newPass}).then(res => {
      this.props.commonActions.showMessageBox('密码更新成功', 'success')
      this.handleCancelDialog()
    }).catch(err => {
      this.props.commonActions.showMessageBox('密码更新失败', 'error')
    })
  }
  handleChangeNewPass(e) {
    this.setState({
      newPass: e.target.value
    })
  }
  handleChangeConfirmPass(e) {
    this.setState({
      confirmPass: e.target.value
    })
    if (e.target.value !== this.state.newPass) {
      this.setState({confirmError: '两次输入尚不一致', btnStatus: true})
    } else {
      this.setState({confirmError: '通过', btnStatus: false})
    }
  }
  render() {
    return (
      <div className="admin-change-password">
        <Dialog open={this.props.open} onEscapeKeyDown={this.handleCancelDialog}>
          <DialogTitle>修改密码</DialogTitle>
          <DialogContent>
            <DialogContentText>
              输入新密码，并确认输入正确。
            </DialogContentText>
            <TextField margin="normal" onChange={this.handleChangeNewPass} ref="newPass" id="group_name" label="输入新密码" type="password" fullWidth autoFocus />
            <TextField margin="normal" onChange={this.handleChangeConfirmPass} ref="confirmPass" id="description" label="再次输入新密码" type="password" fullWidth />
            <FormHelperText>{this.state.confirmError}</FormHelperText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCancelDialog}>取消</Button>
            <Button onClick={this.handleSaveData} color="primary" disabled={this.state.btnStatus}>保存</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    admin: state.admin
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
    commonActions: bindActionCreators({ ...commonActions }, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePassword)
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from '@material-ui/core';
import * as commonActions from '../common/redux/actions';
import { assoc } from 'ramda';
import { ADD_SUCCESS, SUCCESS } from '../../common/consts';

export class AddNewManager extends Component {
  static propTypes = {
    admin: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props)
    this.state = {
      dialogOpen: false,
      modal: {
        username: '',
        phone: '',
        password: ''
      }
    }
    this.handleOpenDialog = this.handleOpenDialog.bind(this)
    this.handleCancelDialog = this.handleCancelDialog.bind(this)
    this.handleSaveData = this.handleSaveData.bind(this)
    this.handleChangePhone = this.handleChangePhone.bind(this)
    this.handleChangeUsername = this.handleChangeUsername.bind(this)
  }

  handleOpenDialog() {
    this.setState({dialogOpen: true})
  }

  handleCancelDialog () {
    this.setState({dialogOpen: false})
  }

  handleChangeUsername(e) {
    this.setState({
      modal: assoc('username', e.target.value, this.state.modal)
    })
  }

  handleChangePhone(e) {
    this.setState({
      modal: assoc('phone', e.target.value, this.state.modal)
    })
  }

  async handleSaveData() {
    await this.props.actions.saveNewManager(this.state.modal)
    this.props.commonActions.showMessageBox(ADD_SUCCESS, SUCCESS)
    this.handleCancelDialog()
    this.props.actions.fetchManagerList()
  }

  render() {
    return (
      <div className="admin-add-new-manager">
        <Button onClick={this.handleOpenDialog} variant="contained" color="primary" className={'admin-add-new-group-addbutton'}>添加新用户</Button>
        <Dialog open={this.state.dialogOpen} onEscapeKeyDown={this.handleCancelDialog}>
          <DialogTitle>创建</DialogTitle>
          <DialogContent>
            <DialogContentText>
              创建一个后台用户, 创建完成后请设置对应权限。
            </DialogContentText>
            <TextField margin="normal" ref="username" onChange={this.handleChangeUsername} id="name" label="输入姓名" type="text" fullWidth autoFocus />
            <TextField margin="normal" ref="phone" onChange={this.handleChangePhone} id="description" label="输入手机号" type="number" fullWidth />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCancelDialog} disabled={this.props.admin.saveNewGroupPending}>取消</Button>
            <Button onClick={this.handleSaveData} color="primary" disabled={this.props.admin.saveNewGroupPending}>保存</Button>
          </DialogActions>
        </Dialog>
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
    commonActions: bindActionCreators({ ...commonActions}, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNewManager);

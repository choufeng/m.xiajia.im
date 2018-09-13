import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from '@material-ui/core';
import { equals } from 'ramda';
import * as commonActions from '../common/redux/showMessageBox';
import { DELETE_FAILURE, FAILURE, DELETE_SUCCESS, SUCCESS } from '../../common/consts';

export class DeleteManager extends Component {
  static propTypes = {
    admin: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props)
    this.state = {
      dialogOpen: false,
      confirm: '',
      errmsg: ''
    }
    this.handleClose = this.handleClose.bind(this)
    this.handleChangeConfirm = this.handleChangeConfirm.bind(this)
    this.handleDeleteGroup = this.handleDeleteGroup.bind(this)
    this.showDeleteDialog = this.showDeleteDialog.bind(this)
  }

  handleClose() {
    this.setState({
      dialogOpen: false,
      errmsg: ''
    })
  }

  showDeleteDialog() {
    this.setState({
      dialogOpen: true,
    })
  }

  isRightConfirm(a, c) {
    return equals(a, c)
  }

  async handleDeleteGroup() {
    if (this.isRightConfirm(this.state.confirm, this.props.admin.activeManager.username)) {
      await this.props.actions.deleteManager({id: this.props.admin.activeManager.id})
      if (this.props.admin.deleteManagerError) {
        this.props.commonActions.showMessageBox(DELETE_FAILURE, FAILURE)
      } else {
        this.props.commonActions.showMessageBox(DELETE_SUCCESS, SUCCESS)
      }
      this.props.actions.fetchManagerList()
      this.props.actions.clearActiveManager()
    } else {
      this.setState({
        errmsg: '输入的名称不匹配，无法删除.'
      })
    }
  }

  handleChangeConfirm(e) {
    this.setState({
      confirm: e.target.value
    })
  }

  render() {
    return (
      <div className="admin-delete-manager">
        <Button onClick={this.showDeleteDialog} variant="contained" color="secondary" disabled={this.props.admin.deleteGroupPending}>删除这个人员</Button>
        <Dialog open={this.state.dialogOpen}>
          <DialogTitle>请确认</DialogTitle>
          <DialogContent>
            <DialogContentText>确定要删除么？请输入名称确认删除：</DialogContentText>
            <TextField margin="normal" onChange={this.handleChangeConfirm} fullWidth></TextField>
            <DialogContentText>{this.state.errmsg}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="flat" onClick={this.handleClose} disabled={this.props.admin.deleteGroupPending}>不删除</Button>
            <Button variant="flat" onClick={this.handleDeleteGroup} color="secondary" disabled={this.props.admin.deleteGroupPending}>确定删除</Button>
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
    commonActions: bindActionCreators({ ...commonActions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteManager);

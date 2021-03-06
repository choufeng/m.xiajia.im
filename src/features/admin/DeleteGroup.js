import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import * as commonActions from '../common/redux/actions'
import {Button, TextField, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions} from '@material-ui/core';
import {equals} from 'ramda';
import { DELETE_FAILURE, FAILURE, DELETE_SUCCESS, SUCCESS, CANNOT_DELETE, SURE_DELETE } from '../../common/consts';

export class DeleteGroup extends Component {
  static propTypes = {
    admin: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props){
    super(props)
    this.state = {
      dialogOpen: false,
      confirm: '',
      errmsg: ''
    }
    this.handleClose = this.handleClose.bind(this)
    this.showDeleteDialog = this.showDeleteDialog.bind(this)
    this.handleDeleteGroup = this.handleDeleteGroup.bind(this)
    this.handleChangeConfirm = this.handleChangeConfirm.bind(this)
  }

  handleClose() {
    this.setState({
      dialogOpen: false,
      errmsg: ''
    })
  }

  showDeleteDialog() {
    this.setState({
      dialogOpen: true
    })
  }

  isRightConfirm (a, c) {
    return equals(a, c)
  }

  async handleDeleteGroup() {
    // 1. 确认输入是否正确， 正确则执行delete， 得到反馈结果
    console.log()
    if (this.isRightConfirm(this.state.confirm, this.props.admin.activeGroup.name)) {
      await this.props.actions.deleteGroup({id: this.props.admin.activeGroup.id})
      if (this.props.admin.deleteGroupError) {
        this.props.commonActions.showMessageBox(DELETE_FAILURE, FAILURE)
      } else {
        this.props.commonActions.showMessageBox(DELETE_SUCCESS, SUCCESS)
      }
      this.props.actions.fetchGroupList()
      this.props.actions.clearActiveGroup()
    } else {
      this.setState({
        errmsg: CANNOT_DELETE
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
      <div className="admin-delete-group">
        <Button onClick={this.showDeleteDialog} variant="contained" color="secondary" disabled={this.props.admin.deleteGroupPending}>删除这个组</Button>
        <Dialog open={this.state.dialogOpen}>
          <DialogTitle>请确认</DialogTitle>
          <DialogContent>
            <DialogContentText>{SURE_DELETE}</DialogContentText>
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
)(DeleteGroup);

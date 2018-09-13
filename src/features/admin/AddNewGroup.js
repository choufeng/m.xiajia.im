import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import * as commonActions from '../common/redux/actions'
import {Button, TextField, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions} from '@material-ui/core';
import {assoc} from 'ramda';

export class AddNewGroup extends Component {
  static propTypes = {
    admin: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props)
    this.state = {
      dialogOpen: false,
      modal: {
        name: '',
        description: '',
        nodekeys: ''
      }
    }
    this.handleOpenDialog = this.handleOpenDialog.bind(this)
    this.handleCancelDialog = this.handleCancelDialog.bind(this)
    this.handleSaveData = this.handleSaveData.bind(this)
    this.handleChangeGroupName = this.handleChangeGroupName.bind(this)
    this.handleChangeDescription = this.handleChangeDescription.bind(this)
  }
  handleOpenDialog () {
    this.setState({dialogOpen: true})
  }
  handleCancelDialog () {
    this.setState({dialogOpen: false})
  }
  async handleSaveData () {
    // 进行数据保存`
    await this.props.actions.saveNewGroup(this.state.modal)
    this.props.commonActions.showMessageBox('添加成功', 'success')
    this.handleCancelDialog()
    this.props.actions.fetchGroupList()
  }

  handleChangeGroupName (e) {
    this.setState({
      modal: assoc('name', e.target.value, this.state.modal)
    })
  }

  handleChangeDescription (e) {
    this.setState({
      modal: assoc('description', e.target.value, this.state.modal)
    })
  }

  render() {
    return (
      <div className="admin-add-new-group">
        <Button onClick={this.handleOpenDialog} variant="contained" color="primary" className={'admin-add-new-group-addbutton'}>添加新组</Button>
        <Dialog open={this.state.dialogOpen} onEscapeKeyDown={this.handleCancelDialog}>
          <DialogTitle>创建</DialogTitle>
          <DialogContent>
            <DialogContentText>
              创建一个权限组, 创建完成后请设置对应权限。
            </DialogContentText>
            <TextField margin="normal" onChange={this.handleChangeGroupName} ref="name" id="name" label="输入组名称" type="text" fullWidth autoFocus />
            <TextField margin="normal" onChange={this.handleChangeDescription} ref="description" id="description" label="输入对分组的描述" type="text" fullWidth />
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
    commonActions: bindActionCreators({ ...commonActions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNewGroup);

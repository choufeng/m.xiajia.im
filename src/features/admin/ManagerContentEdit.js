import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import * as commonActions from '../common/redux/actions';
import { Grid, TextField, Button, MenuItem } from '@material-ui/core'
import {map, clone, isNil, assoc} from 'ramda';
import { FAILURE, SUCCESS, SAVE_SUCCESS } from '../../common/consts';

export class ManagerContentEdit extends Component {
  static propTypes = {
    admin: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props)
    this.state = {
      item: {
        id: '',
        username: '',
        phone: '',
      },
      group: ''
    }
    this.initData = this.initData.bind(this)
    this.handleChangeGroup = this.handleChangeGroup.bind(this)
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleChangePhone = this.handleChangePhone.bind(this)
    this.handleSaveUpdate = this.handleSaveUpdate.bind(this)
    this.getGroupId = this.getGroupId.bind(this)
  }

  componentDidMount() {
    this.initData(this.props.admin.activeManager)
  }

  initData (i) {
    this.setState({
      item: clone(i),
    })
  }

  getGroupId (g) {
    return isNil(g) ? 0 : g.id
  }

  handleChangeGroup (e) {
    this.setState({
      item: assoc('group', {id: e.target.value}, this.state.item)
    })
  }

  handleChangeName(e) {
    this.setState({
      item: assoc('username', e.target.value, this.state.item)
    })
  }

  handleChangePhone(e) {
    this.setState({
      item: assoc('phone', e.target.value, this.state.item)
    })
  }
  handleSaveUpdate() {
    // 保存要提供的是
    this.props.actions.fetchSaveManagerUpdate(this.state.item).then(() => {
      this.props.commonActions.showMessageBox(SAVE_SUCCESS, SUCCESS)
      this.props.actions.fetchManagerList().catch(() => {
        this.props.commonActions.showMessageBox(`未能成功加载列表:${this.props.admin.fetchGroupListError}`, FAILURE)
      })
    })
  }
  render() {
    const groups = this.props.admin.groupList;
    return (
      <div className="admin-manager-content-edit">
        <Grid container>
          <Grid item xs={12} className="admin-manager-content-edit-item">
              <TextField onChange={this.handleChangeName} value={this.state.item.username} label="姓名" className="admin-manager-content-edit-form" />
          </Grid>
          <Grid item xs={12} className="admin-manager-content-edit-item">
              <TextField onChange={this.handleChangePhone} value={this.state.item.phone} label="手机号" className="admin-manager-content-edit-form" />
          </Grid>
          <Grid item xs={12} className="admin-manager-content-edit-item">
              <TextField select label="权限组" value={this.getGroupId(this.state.item.group)} onChange={this.handleChangeGroup} className="admin-manager-content-edit-form">
              {
                map((item) => {
                  return (<MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)
                }, groups)
              }
              </TextField>
          </Grid>
          <Grid item xs={12} className="admin-manager-content-edit-item">
            <Button variant="contained" color="primary" onClick={this.handleSaveUpdate}>保 存</Button>
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
    actions: bindActionCreators({ ...actions }, dispatch),
    commonActions: bindActionCreators({ ...commonActions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManagerContentEdit);

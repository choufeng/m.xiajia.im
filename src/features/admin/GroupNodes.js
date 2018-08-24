import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import * as commonActions from '../common/redux/actions'
import { Grid, Button } from '@material-ui/core'

export class GroupNodes extends Component {
  static propTypes = {
    admin: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props)
    this.state = {
      list: [],
      title: ''
    }
    this.handleDeleteGroup = this.handleDeleteGroup.bind(this)
  }

  //实现list
  componentDidMount() {
  }

  async handleDeleteGroup() {
    // 流程要梳理的，判断再给出是否显示提示
    await this.props.actions.deleteGroup({id: this.props.admin.activeGroup.id})
    this.props.commonActions.showMessageBox('delete successful', 'success')
    this.props.actions.fetchGroupList()
    this.props.actions.clearActiveGroup()
  }

  render() {
    return (
      <div className="admin-group-nodes">
        <Grid container>
          <Grid item xs={9} className="admin-group-nodes-content">
            <div className="admin-group-nodes-title"> <b>{this.props.admin.activeGroup.group_name}</b>权限组的节点权限</div>
            <div className="admin-group-nodes-list">
                <ul>
                  {
                    this.props.admin.groupNodes.map(i => {
                      return <li key={i.id}>{i.name}</li>
                    })
                  }
                </ul>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className="admin-group-nodes-title">操作</div>
            <div className="admin-group-nodes-buttons">
              <Grid container>
                <Grid item xs={12} className="admin-group-nodes-buttons-item">
                  <Button variant="contained" color="primary">保存设定</Button>
                </Grid>
                <Grid item xs={12} className="admin-group-nodes-buttons-item">
                  <Button onClick={this.handleDeleteGroup} variant="contained" color="secondary" disabled={this.props.admin.deleteGroupPending}>删除这个组</Button>
                </Grid>
              </Grid>
            </div>
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
    commonActions: bindActionCreators({ ...commonActions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupNodes);

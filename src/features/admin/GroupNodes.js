import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import * as commonActions from '../common/redux/actions'
import { Grid, Button } from '@material-ui/core'
import {DeleteGroup, RenderGroupNodesList} from './'
import * as R from 'ramda';

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
    this.groupNodesWithAll = this.groupNodesWithAll.bind(this)
  }


  groupNodesWithAll () {
    let all = this.props.admin.groupNodes
    let d = R.map(i => {
      i.selected = true
      return i
    }, all)
    let data = R.groupWith((a, b) => R.equals(a.category, b.category), d)
    return data
  }

  handleChangeNode (nodekey) {
    // 把所有的node组织回传递的结构， 提取出所有需要传递的点。发出请求。
    // 循环所有列表，找到这个nodekey并设置为反bool, 提交数据
  }

  render() {
    const list = this.groupNodesWithAll()
    return (
      <div className="admin-group-nodes">
        <Grid container>
          <Grid item xs={9} className="admin-group-nodes-content">
            <div className="admin-group-nodes-title"> <b>{this.props.admin.activeGroup.group_name}</b>权限组的节点权限</div>
            <div className="admin-group-nodes-list">
            {
              R.addIndex(R.map)((v,i) => {
                return (
                  <RenderGroupNodesList key={i} list={v} valueChanged={this.handleChangeNode} />
                )
              }, list)
            }
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
                  <DeleteGroup />
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

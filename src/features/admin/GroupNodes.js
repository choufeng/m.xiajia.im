import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import * as commonActions from '../common/redux/actions'
import { Grid, Button } from '@material-ui/core'
import {DeleteGroup} from './'
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

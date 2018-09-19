import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Grid, TextField, Button, MenuItem } from '@material-ui/core'
import {map, clone} from 'ramda';

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
  }

  componentDidMount() {
    this.initData(this.props.admin.activeManager)
  }

  initData (i) {
    this.setState({
      item: clone(i)
    })
  }

  render() {
    const groups = this.props.admin.groupList;
    return (
      <div className="admin-manager-content-edit">
        <Grid container>
          <Grid item xs={12} className="admin-manager-content-edit-item">
              <TextField value={this.props.admin.activeManager.username} label="姓名" className="admin-manager-content-edit-form" />
          </Grid>
          <Grid item xs={12} className="admin-manager-content-edit-item">
              <TextField value={this.state.item.phone} label="手机号" className="admin-manager-content-edit-form" />
          </Grid>
          <Grid item xs={12} className="admin-manager-content-edit-item">
              <TextField select label="权限组" value={this.state.group} className="admin-manager-content-edit-form">
              {
                map((item) => {
                  return (<MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)
                }, groups)
              }
              </TextField>
          </Grid>
          <Grid item xs={12} className="admin-manager-content-edit-item">
            <Button variant="contained" color="primary">保 存</Button>
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
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManagerContentEdit);

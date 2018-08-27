import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import {Grid, Button, Menu, MenuItem} from '@material-ui/core';
import {withRouter} from 'react-router-dom'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'

export class TopPanel extends Component {
  static propTypes = {
    admin: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props)
    this.state = {
      anchorEl: null
    }
    this.handleClickUserMenu = this.handleClickUserMenu.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }
  handleClickUserMenu(event) {
    this.setState({ anchorEl: event.currentTarget })
  }
  handleClose() {
    this.setState({anchorEl: null})
  }
  handleLogout() {
    this.props.history.push('/logout')
  }
  render() {
    const { anchorEl } = this.state
    return (
      <div className="admin-top-panel">
        <Grid container spacing={16}>
          <Grid item xs={4} className="admin-top-panel-title"><h3>{this.props.admin.sideSelected}</h3></Grid>
          <Grid item xs={6} className="admin-top-panel-menu"></Grid>
          <Grid item xs={2} className="admin-top-panel-right">
            <Button variant="flat" aria-owns="simple-menu" aria-haspopup="true" onClick={this.handleClickUserMenu}>超级管理员 <ArrowDropDown></ArrowDropDown></Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
            >
              <MenuItem onClick={this.handleClose}>个人资料</MenuItem>
              <MenuItem onClick={this.handleClose}>修改密码</MenuItem>
              <MenuItem onClick={this.handleLogout}>退出系统</MenuItem>
            </Menu>
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
)(withRouter(TopPanel));

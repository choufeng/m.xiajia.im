import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as actions from './redux/actions';
import * as commonActions from '../common/redux/actions'
import {TextField, Grid, Button, FormHelperText, LinearProgress} from '@material-ui/core'
import localforage from 'localforage'

export class LoginBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: 'choufeng',
      password: '123123',
      usernameError: false,
      btnStatus: false,
      show: true,
      version: ''
    }
    this.doLogin = this.doLogin.bind(this)
    this.inputUsername = this.inputUsername.bind(this)
    this.inputPassword = this.inputPassword.bind(this)
  }
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };
  
  doLogin () {
    this.props.actions.fetchLogin({
      username: this.state.username,
      password: this.state.password
    }).then((res) => {
      localforage.setItem('accessToken', this.props.home.accessToken)
      localforage.setItem('userId', this.props.home.userId)
      localforage.setItem('userName', this.state.username)
      this.props.actions.fetchGetUserGroup(this.props.home.userId).then(res => {
        localforage.setItem('roleNodes', this.props.home.roleNodes)
        this.props.commonActions.showMessageBox('login successful', 'success')
        this.props.history.push('/admin/dashboard')
      })
    }).catch(err => {
      this.props.commonActions.showMessageBox(this.props.home.fetchLoginError, 'error')
    })
  }
  inputUsername (e) {
    if (e.target.value === 'a') {
      this.setState({
        usernameError: true
      })
    } else if (e.target.value === 'bbb') {
      this.setState({
        usernameError: false
      })
    } 
    this.setState({
      username: e.target.value
    })
  }

  inputPassword (e) {
    this.setState({
      password: e.target.value
    })
  }

  componentDidMount () {
  }

  render() {
    return (
      <div className="home-login-box">
        <Grid container>
          <Grid item xs={12}>
            <TextField label="Username" error={this.state.usernameError} value={this.state.username} onChange={this.inputUsername} color="primary" className="hlb-input" />
            <FormHelperText>{this.state.username}</FormHelperText>
          </Grid>
          <Grid item xs={12}>
            <TextField type="password" value={this.state.password} onChange={this.inputPassword} label="Password" className="hlb-input" />
          </Grid>
          <Grid item xs={12}>
            <Button variant="outlined" color="inherit" className="hlb-button" onClick={this.doLogin} disabled={this.props.home.fetchLoginPending}> Login </Button>
          </Grid>
          <Grid item xs={12}>
            {this.props.home.fetchLoginPending && <LinearProgress className="hlb-input" />}
          </Grid>
        </Grid>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
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
)(withRouter(LoginBox));

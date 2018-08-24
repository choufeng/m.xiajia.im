import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as actions from './redux/actions';
import * as commonActions from '../common/redux/actions'
import {TextField, Grid, Button, FormHelperText, LinearProgress} from '@material-ui/core'
import api from '../../common/api'

export class LoginBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      usernameError: false,
      btnStatus: false,
      show: true,
      version: ''
    }
    this.doLogin = this.doLogin.bind(this)
    this.inputUsername = this.inputUsername.bind(this)
    this.inputPassword = this.inputPassword.bind(this)
    this.getVersion = this.getVersion.bind(this)
  }
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };
  
  doLogin () {
    this.setState({show: true})
    api.get(`Users/login`).then(res => {
      console.log(res)
    }).catch(e => {
      console.log(e)
    })
    this.setState({
      btnStatus: true
    })
    console.log('doLogin')
    setTimeout(() => {
      this.props.commonActions.showMessageBox('login successful', 'success')
      this.setState({
        btnStatus: false
      })
      this.props.history.push('/admin/dashboard')
    }, 2000)
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

  getVersion () {
    api.get(`basic_config/findOne?filter=${JSON.stringify({where:{key:'version'}})}`).then(res => {
      console.log('version:', res.data.value)
      this.setState({version: res.data.value})
    })
  }

  componentDidMount () {
    this.getVersion()
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
            <Button variant="outlined" color="inherit" className="hlb-button" onClick={this.doLogin} disabled={this.state.btnStatus}> Login </Button>
          </Grid>
          <Grid item xs={12}>
            {this.state.btnStatus && <LinearProgress className="hlb-input" />}
          </Grid>
          {/* <Grid item xs={12}>
            Version: {this.state.version}
          </Grid> */}
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

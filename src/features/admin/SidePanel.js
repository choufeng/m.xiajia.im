import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import classNames from 'classnames'
import {NavLink} from 'react-router-dom'
import {LinearProgress} from '@material-ui/core'

export class SidePanel extends Component {
  static propTypes = {
    admin: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props)
    this.state = {}
    this.isActive = this.isActive.bind(this)
  }

  componentDidMount() {
    this.props.actions.setSideMenu()
  }

  isActive (t) {
    return this.props.admin.sideSelected === t
  }

  render() {
    return (
      <div className="admin-side-panel">
          <ul>
            {
              this.props.admin.setSideMenuPending ? <li><LinearProgress color={'secondary'}/></li> :
              this.props.admin.sideMenu.map(i => {
                return (
                  <li className={classNames('admin-side-panel-item')} key={i.id}>
                    <NavLink to={i.uri} activeClassName={'admin-side-panel-item-active'}>{i.title}</NavLink>
                  </li>
                )
              })
            }
          </ul>
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
)(SidePanel);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import * as commonActions from '../common/redux/actions'
import {LinearProgress} from '@material-ui/core'
import classNames from 'classnames'
import { AddNewManager } from './';
import { CANNOT_LOAD_LIST } from '../../common/consts';

export class ManagerList extends Component {
  static propTypes = {
    admin: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props)
    this.setActive = this.setActive.bind(this)
    this.isActive = this.isActive.bind(this)
  }

  setActive (i) {
    this.props.actions.clearActiveManager().then(() => {
      this.props.actions.setActiveManager(i)
    })
  }

  isActive(id) {
    return (id === this.props.admin.activeManager.id)
  }

  componentDidMount() {
    this.props.actions.fetchManagerList().catch(() => {
      this.props.commonActions.showMessageBox(`${CANNOT_LOAD_LIST}: ${this.props.admin.fetchManagerListError}`, 'error')
      console.log(this.props.admin.fetchManagerListError)
    })
  }

  render() {
    return (
      <div className="admin-manager-list">
        <div className="admin-manager-list-title">管理员列表</div>
          <ul className="admin-manager-list-li">
            {
              this.props.admin.fetchManagerListPending ? <li><LinearProgress /></li> : 
              this.props.admin.managerList.map(i => {
                return (
                  <li onClick={e => {this.setActive(i); e.preventDefault();}} className={classNames({'admin-manager-list-active': this.isActive(i.id)})} key={i.id}>
                    {i.username}
                  </li>
                )
              })
            }
          </ul>
        <div className="admin-manager-list-bottom">
          <AddNewManager/>
        </div>
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
)(ManagerList);

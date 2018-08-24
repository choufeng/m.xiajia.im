import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import classNames from 'classnames';
import {Button} from '@material-ui/core';

export class GroupList extends Component {
  constructor(props) {
    super(props)
    this.isActive = this.isActive.bind(this)
    this.setActive = this.setActive.bind(this)
  }
  static propTypes = {
    admin: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.actions.fetchGroupList()
  }

  isActive(id) {
    return (id === this.props.admin.activeGroup)
  }

  setActive(id) {
    this.props.actions.setActiveGroup(id)
  }

  render() {
    return (
      <div className="admin-group-list">
        <div className="admin-group-list-title">权限组列表</div>
        <ul className="admin-group-list-li">
          {
            this.props.admin.groupList.map(i => {
              return (
                <li onClick={e => {this.setActive(i.id); e.preventDefault();}} className={classNames({'admin-group-list-active': this.isActive(i.id)})}>{i.group_name}</li>
              )
            })
          }
        </ul>
        <div className="admin-group-list-bottom">
          <Button variant="contained" color="primary" className={'admin-group-list-addbutton'}>Add Group</Button>
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
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupList);

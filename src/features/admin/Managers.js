import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import {Grid} from '@material-ui/core'
import {ManagerList} from './';
import {ManagerContent} from './';
import {not, isEmpty} from 'ramda';
import { FAILURE } from '../../common/consts';

export class Managers extends Component {
  static propTypes = {
    admin: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.actions.setSideSelected('人员管理')
    this.props.actions.fetchGroupList().catch(() => {
      this.props.showMessageBox(`未能成功加载列表:${this.props.admin.fetchGroupListError}`, FAILURE)
    })

  }

  hasManagerContent(t) {
    return not(isEmpty(t))
  }

  render() {
    return (
      <div className="admin-managers">
        <Grid container>
          <Grid item xs={3}>
            <ManagerList />
          </Grid>
          <Grid item xs={9}>
            { 
              this.hasManagerContent(this.props.admin.activeManager) && <ManagerContent />
            }
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
)(Managers);

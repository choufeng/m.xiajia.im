import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import classNames from 'classnames';
import { Button } from '@material-ui/core';

const action = (
  <Button>X</Button>
)
export class ShowMessage extends Component {
  constructor(props) {
    super(props)
    this.onClose = this.onClose.bind(this)
  }
  static propTypes = {
    common: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  }

  onClose () {
    this.props.actions.closeMessageBox()
  }

  render() {
    return (
      <div className="common-show-message">
        <Snackbar autoHideDuration={5000} onClose={this.onClose} anchorOrigin={{vertical: 'top', horizontal: 'right'}} open={this.props.common.messageOpenStatus} action={action} >
          <SnackbarContent className={classNames(this.props.common.messageType)} message={this.props.common.message} />
        </Snackbar>
      </div>
    )
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    common: state.common,
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
)(ShowMessage);

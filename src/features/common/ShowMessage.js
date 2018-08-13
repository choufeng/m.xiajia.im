import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Snackbar from '@material-ui/core/Snackbar';

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
    let s = { vertical: 'top', horizontal: 'right',}
    return (
      <div className="common-show-message">
        <Snackbar autoHideDuration={5000} onClose={this.onClose} anchorOrigin={s} open={this.props.common.messageOpenStatus} message={this.props.common.message} />
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

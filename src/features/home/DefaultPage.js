import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import LoginBox from './LoginBox'
import { connect } from 'react-redux';
import * as actions from './redux/actions';
export class DefaultPage extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired
  }
  
  render() {
    return (
      <div className="home-default-page">
        <Grid container>
          <Grid item xs={4} className="hdp-left">
          </Grid>
          <Grid item xs={8} className="hdp-right">
            <LoginBox />
          </Grid>
        </Grid>
      </div>
    )
  }
}

// /* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

// /* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultPage);
// export default DefaultPage
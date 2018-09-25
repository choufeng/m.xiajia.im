import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import * as adminActions from '../admin/redux/actions';
import { Grid } from '@material-ui/core';
import {RootCategorys, CategoryList, AddCategory } from './';

export class DefaultPage extends Component {
  static propTypes = {
    category: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount () {
    this.props.adminActions.setSideSelected('分类管理')
    this.props.actions.fetchGetRootCategoryList();
  }

  render() {
    return (
      <div className="category-default-page">
        <Grid container>
          <Grid item xs={4} className="category-default-page-left">
            <RootCategorys></RootCategorys>
            <CategoryList></CategoryList>
            <AddCategory></AddCategory>
          </Grid>
          <Grid item xs={5} className="category-default-page-content">
            中
          </Grid>
          <Grid item xs={3} className="category-default-page-right">
          you
          </Grid>
        </Grid>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    category: state.category,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
    adminActions: bindActionCreators({ ...adminActions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultPage);

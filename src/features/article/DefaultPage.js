import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import * as adminActions from '../admin/redux/actions';
import { Grid, Button } from '@material-ui/core';
import { ArticleTable, ArticleForm } from './';

export class DefaultPage extends Component {
  static propTypes = {
    article: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount () {
    this.props.adminActions.setSideSelected('文章管理')
  }

  render() {
    return (
      <div className="article-default-page">
        <Grid container>
          <Grid item xs={6} className="article-default-page-left">
            <Grid container>
              <Grid item xs={12} className="article-default-page-search">检索</Grid>
              <Grid item xs={12} className="article-default-page-table">
                <ArticleTable></ArticleTable>
              </Grid>
              <Grid item xs={12} className="article-default-page-add">
                <Button variant="contained" color={"primary"}>添加新文章</Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <ArticleForm></ArticleForm>
          </Grid>
        </Grid>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    article: state.article,
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

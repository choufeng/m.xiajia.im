import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { setSideSelected } from '../admin/redux/actions';
import { fetchGetCategoryTreeBySelectedRootId } from '../category/redux/actions'
import { Grid, Button } from '@material-ui/core';
import { ArticleTable, ArticleForm } from './';
import { CATEGORY_ARTICLE_ID } from '../../common/consts';

export class DefaultPage extends Component {
  static propTypes = {
    article: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props)
    this.state = {
      modal: {},
      showForm: false
    }
    this.handleCloseForm = this.handleCloseForm.bind(this)
    this.handleOpenForm = this.handleOpenForm.bind(this)
    this.handleSetDataAndShowForm = this.handleSetDataAndShowForm.bind(this)
    this.handleCreateNewArticleForm = this.handleCreateNewArticleForm.bind(this)
  }

  handleOpenForm () {
    return new Promise(resolve => {
      this.setState({
        showForm: true
      })
      resolve(true)
    })
  }

  handleCloseForm() {
    return new Promise(resolve => {
      this.setState({
        showForm: false
      })
      resolve(true)
    })
  }

  initModal() {
    this.setState({
      modal: {
        id: null,
        title: '',
        link: '',
        content: '',
        status: 0,
        categorys: []
      }
    })
  }

  handleCreateNewArticleForm() {
    this.initModal()
    this.handleOpenForm()
  }

  handleSetDataAndShowForm(data) {
    this.handleCloseForm().then(() => {
      this.setState({
        modal: data
      })
      this.handleOpenForm()
    })
  }

  componentDidMount () {
    const { actions } = this.props
    actions.setSideSelected('文章管理')
    actions.fetchGetArticleList()
    actions.fetchGetArticleCount()
    actions.fetchGetCategoryTreeBySelectedRootId(CATEGORY_ARTICLE_ID)
  }

  render() {
    return (
      <div className="article-default-page">
        <Grid container>
          <Grid item xs={5} className="article-default-page-left">
            <Grid container>
              <Grid item xs={12} className="article-default-page-add">
                <Button variant="contained" color={"primary"} onClick={this.handleCreateNewArticleForm} >添加新文章</Button>
              </Grid>
              <Grid item xs={12} className="article-default-page-search"></Grid>
              <Grid item xs={12} className="article-default-page-table">
                <ArticleTable onEditArticle={(row) => this.handleSetDataAndShowForm(row)}></ArticleTable>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={7}>
            { this.state.showForm && <ArticleForm data={this.state.modal} onClose={this.handleCloseForm} /> }
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
    actions: bindActionCreators({ ...actions, fetchGetCategoryTreeBySelectedRootId, setSideSelected }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultPage);

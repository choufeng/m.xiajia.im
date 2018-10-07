import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Table, TableHead, TableCell, Paper, TableBody, TableRow, Button, TablePagination } from '@material-ui/core';
import { map } from 'ramda';

export class ArticleTable extends Component {
  static propTypes = {
    article: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props)
    this.state = {
      page: 0,
      rowsPerPage: 15
    }
  }

  handleChangePage = (e, newPage) => {
    this.setState({page: newPage})
    this.props.actions.setArticleListPage(newPage)
    this.props.actions.fetchGetArticleList()
  }

  handleChangeRowsPerPage = event => {
    this.setState({rowsPerPage: event.target.value})
    this.props.actions.setArticleListLimit(event.target.value)
    this.props.actions.fetchGetArticleList()
  }

  render() {
    const {articleList, articleCount} = this.props.article
    const {onEditArticle} = this.props
    const {page, rowsPerPage} = this.state
    return (
      <div className="article-table">
        <Paper>
          <Table>
            <TableHead>
              <TableCell>ID</TableCell>
              <TableCell numeric>标题</TableCell>
              <TableCell numeric>状态</TableCell>
              <TableCell numeric>操作</TableCell>
            </TableHead>
            <TableBody>
              {
                map(row => {
                  return (
                    <TableRow key={row .id}>
                      <TableCell numeric>{row.id}</TableCell>
                      <TableCell numeric>{row.title}</TableCell>
                      <TableCell numeric>{row.status}</TableCell>
                      <TableCell numeric>
                        <Button variant="text">发布</Button>
                        <Button variant="text" onClick={onEditArticle(row)}>编辑</Button>
                        <Button variant="text" color="secondary">删除</Button>
                      </TableCell>
                    </TableRow>
                  )
                }, articleList)
              }
            </TableBody>
          </Table>
          <TablePagination
          component="div"
          count={articleCount}
          rowsPerPage={rowsPerPage}
          page={page}
          rowsPerPageOptions={[15, 30, 100]}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
        </Paper>
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
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleTable);

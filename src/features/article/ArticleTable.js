import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Table, TableHead, TableCell, Paper, TableBody, TableRow, Button, TablePagination, Grid } from '@material-ui/core';
import { map } from 'ramda';
import { DeleteArticle } from './';

export class ArticleTable extends Component {
  static propTypes = {
    article: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props)
    this.state = {
      page: 0,
      rowsPerPage: 10
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

  handleSetStatus(row) {
    console.log('status', row)
  }

  render() {
    const {articleList, articleCount} = this.props.article
    const {page, rowsPerPage} = this.state
    return (
      <div className="article-table">
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell numeric>标题</TableCell>
                <TableCell numeric>状态</TableCell>
                <TableCell numeric>操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                map(row => {
                  return (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell numeric>{row.title}</TableCell>
                      <TableCell numeric>{row.status}</TableCell>
                      <TableCell numeric>
                        <Grid container>
                          <Grid item xs={6}>
                            <Button variant="text" onClick={() => this.props.onEditArticle(row)}>编辑</Button>
                          </Grid>
                          <Grid item xs={6}>
                            <DeleteArticle row={row}></DeleteArticle>
                          </Grid>
                        </Grid>
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
          rowsPerPageOptions={[10, 30, 100]}
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

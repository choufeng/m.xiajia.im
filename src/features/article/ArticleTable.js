import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Table, TableHead, TableCell, Paper, TableBody, TableRow, Button, TablePagination, Checkbox } from '@material-ui/core';
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
      rowsPerPage: 10
    }
    this.handleEdit = this.handleEdit.bind(this)
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

  handleEdit(row) {
    console.log('row', row)
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
                        <Button variant="text" onClick={this.handleEdit(row)}>编辑</Button>
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

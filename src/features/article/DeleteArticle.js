import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';

export class DeleteArticle extends Component {
  static propTypes = {
    article: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props)
    this.state = {
      dialogOpen: false
    }
    this.handleDelete = this.handleDelete.bind(this)
    this.handleOpenDialog = this.handleOpenDialog.bind(this)
    this.handleCloseDialog = this.handleCloseDialog.bind(this)
  }

  handleOpenDialog() {
    this.setState({
      dialogOpen: true
    })
  }

  handleCloseDialog() {
    this.setState({
      dialogOpen: false
    })
  }

  handleDelete() {
    console.log('delete')
    this.props.actions.fetchDeleteArticle(this.props.row.id).then(() => {
      this.props.actions.fetchGetArticleCount()
      this.props.actions.fetchGetArticleList()
    })
  }

  render() {
    return (
      <div className="article-delete-article">
        <Button variant="text" onClick={this.handleOpenDialog} color="secondary">删除</Button>
        <Dialog open={this.state.dialogOpen}>
          <DialogTitle>请确认</DialogTitle>
          <DialogContent>
            <DialogContentText>确定要删除么这篇文章？删除后将无法恢复</DialogContentText>
            <DialogContentText>文章标题：{this.props.row.title}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="flat" onClick={this.handleCloseDialog}>不删除</Button>
            <Button variant="flat" color="secondary" onClick={() => this.handleDelete()}>确定删除</Button>
          </DialogActions>
        </Dialog>
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
)(DeleteArticle);

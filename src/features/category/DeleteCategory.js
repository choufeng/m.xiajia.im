import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import * as commonActions from '../common/redux/actions';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from '@material-ui/core';
import { equals } from 'ramda';
import { DELETE_SUCCESS, SUCCESS, FAILURE, CANNOT_DELETE } from '../../common/consts';

export class DeleteCategory extends Component {
  static propTypes = {
    category: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props)
    this.state = {
      dialogOpen: false,
      errmsg: '',
      confirm: ''
    }
    this.handleOpenDialog = this.handleOpenDialog.bind(this)
    this.handleRemoveCategory = this.handleRemoveCategory.bind(this)
    this.handleChangeConfirm = this.handleChangeConfirm.bind(this)
    this.handleCloseDialog = this.handleCloseDialog.bind(this)
  }
  
  handleCloseDialog() {
    this.setState({
      dialogOpen: false
    })
  }

  handleOpenDialog() {
    this.setState({
      dialogOpen: true
    })
  }

  handleChangeConfirm(e) {
    this.setState({
      confirm: e.target.value
    })
  }

  isRightConfirm (a, c) {
    return equals(a, c)
  }

  async handleRemoveCategory() {
    if (this.isRightConfirm(this.state.confirm, this.props.category.activeCategory.name)) {
      await this.props.actions.fetchRemoveCategory(this.props.category.activeCategory.id).then(() => {
        // 更新树， 清空数据
        this.props.actions.fetchGetRootCategoryList();
        this.props.actions.fetchGetRemoveRootCategory();
        this.props.actions.clearActiveCategory();
        this.props.actions.fetchGetCategoryTreeBySelectedRootId(this.props.category.selectRootCategory);
        this.props.actions.fetchGetCategoryListBySelectedRootId(this.props.category.selectRootCategory);
        this.props.commonActions.showMessageBox(DELETE_SUCCESS, SUCCESS)
        this.handleCloseDialog()
      })
    } else {
      this.setState({
        errmsg: CANNOT_DELETE
      })
    }
  }

  render() {
    return (
      <div className="category-delete-category">
        <Button variant="contained" color="secondary" onClick={this.handleOpenDialog}>移除这个分类</Button>
        <Dialog open={this.state.dialogOpen}>
          <DialogTitle>请确认</DialogTitle>
          <DialogContent>
            <DialogContentText>确定要移除这个分类么？</DialogContentText>
            <TextField margin="normal" onChange={this.handleChangeConfirm} fullWidth></TextField>
            <DialogContentText>{this.state.errmsg}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="flat" onClick={this.handleClose} disabled={this.props.category.fetchRemoveCategoryPending}>不移除</Button>
            <Button variant="flat" onClick={this.handleRemoveCategory} color="secondary" disabled={this.props.category.fetchRemoveCategoryPending}>确定移除</Button>
          </DialogActions>
        </Dialog>
        <p>移除这个分类将会导致子分类也一起移除，所以谨慎处理, 提前移动仍然需要的子分类。</p>
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
    commonActions: bindActionCreators({ ...commonActions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteCategory);

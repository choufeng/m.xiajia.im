import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import * as commonActions from '../common/redux/actions';
import { Button, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, TextField, MenuItem, Grid } from '@material-ui/core';
import { assoc } from 'ramda';
import { SUCCESS, ADD_SUCCESS, FAILURE } from '../../common/consts';
import getErrorMessage from '../../common/getErrorMessage';
import * as R from 'ramda';

export class AddCategory extends Component {
  static propTypes = {
    category: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props)
    this.state = {
      dialogOpen: false,
      modal: {
        name: '',
        description: '',
        parent: 0,
        sort: 0
      }
    }
    this.handleCancelDialog = this.handleCancelDialog.bind(this)
    this.handleOpenDialog = this.handleOpenDialog.bind(this)
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleChangeDescription = this.handleChangeDescription.bind(this)
    this.handleSaveData = this.handleSaveData.bind(this)
    this.handleCreateRootCategory = this.handleCreateRootCategory.bind(this)
    this.handleCreateChildrenCategory = this.handleCreateChildrenCategory.bind(this)
    this.isActiveCategory = this.isActiveCategory.bind(this)
  }

  handleCreateChildrenCategory() {
    this.setState({
      modal: R.assoc('parent', this.props.category.activeCategory.id, this.state.modal)
    })
    this.handleOpenDialog()
  }

  handleCreateRootCategory () {
    this.setState({
      modal: R.assoc('parent', 0, this.state.modal)
    })
    this.handleOpenDialog()
  }

  handleCancelDialog() {
    this.setState({
      dialogOpen: false
    })
  }

  handleOpenDialog() {
    this.setState({
      dialogOpen: true
    })
  }

  handleChangeName(e) {
    this.setState({
      modal: assoc('name', e.target.value, this.state.modal)
    })
  }
  
  handleChangeSort(e) {
    this.setState({
      modal: assoc('sort', e.target.value, this.state.modal)
    })
  }

  handleChangeDescription(e) {
    this.setState({
      modal: assoc('description', e.target.value, this.state.modal)
    })
  }

  isActiveCategory (t) {
    return R.isEmpty(t)
  }

  handleSaveData() {
    this.props.actions.fetchAddCategory(this.state.modal).then(() => {
      this.props.commonActions.showMessageBox(ADD_SUCCESS, SUCCESS)
      this.handleCancelDialog()
      this.props.actions.fetchGetRootCategoryList();
      this.props.actions.fetchGetRemoveRootCategory();
      this.props.actions.fetchGetCategoryTreeBySelectedRootId(this.props.category.selectRootCategory);
      this.props.actions.fetchGetCategoryListBySelectedRootId(this.props.category.selectRootCategory);
      // TODO 更新root列表， 更新树列表
    }).catch(() => {
      this.props.commonActions.showMessageBox(getErrorMessage(this.props.category.fetchAddCategoryError), FAILURE)
    })
  }

  render() {
    const ac = R.equals(this.state.modal.parent, 0) ? {id: 0, name: '根分类'} : this.props.category.activeCategory
    return (
      <div className="category-add-category">
        <Grid container>
          <Grid item xs={6}>
            <Button variant="contained" color="primary" onClick={this.handleCreateRootCategory}>创建分类</Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" color="primary" disabled={this.isActiveCategory(this.props.category.activeCategory)} onClick={this.handleCreateChildrenCategory}>创建当前分类的子分类</Button>
          </Grid>
        </Grid>
        <Dialog open={this.state.dialogOpen} onEscapeKeyDown={this.handleCancelDialog}>
          <DialogTitle>创建</DialogTitle>
          <DialogContent>
            <DialogContentText>
              创建一个分类
            </DialogContentText>
            <TextField margin="normal" value={this.state.modal.name} onChange={this.handleChangeName} ref="name" id="name" label="输入分类名称" type="text" fullWidth autoFocus />
            <TextField margin="normal" value={this.state.modal.description} onChange={this.handleChangeDescription} ref="description" id="description" label="输入对分类的简单描述" type="text" fullWidth />
            <TextField margin="normal" value={this.state.modal.sort} onChange={this.handleChangeSort} ref="sort" id="sort" label="排序号: 大号靠前" type="number" fullWidth autoFocus />
            <TextField margin="normal" value={this.state.modal.parent} select ref="parent" label="上级分类" fullWidth>
              <MenuItem value={ac.id}>{ac.name}</MenuItem>
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCancelDialog} disabled={this.props.category.fetchAddCategoryPending}>取消</Button>
            <Button onClick={this.handleSaveData} color="primary" disabled={this.props.category.fetchAddCategoryPending}>保存</Button>
          </DialogActions>
        </Dialog>
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
)(AddCategory);

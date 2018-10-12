import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import * as commonActions from '../common/redux/actions';
import { TextField, Grid, Button, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { last, init, map, isEmpty, difference, not } from 'ramda';
import { SUCCESS, SAVE_SUCCESS } from '../../common/consts';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '80%'
  },
  button: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});

export class CategoryEdit extends Component {
  static propTypes = {
    category: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props)
    this.state = {
      id: null,
      name: '',
      description: '',
      sort: 0,
      parent:null
    }
    this.getParent = this.getParent.bind(this)
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleChangeDescription = this.handleChangeDescription.bind(this)
    this.handleChangeParent = this.handleChangeParent.bind(this)
    this.handleChangeSort = this.handleChangeSort.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  // getCategoryList() {
  //   const l = this.props.category.categoryTree
  //   const list = this._returnChildrenTreeToList(l, 0, [])
  //   console.log('深度合并的list', list)
  // }

  // _returnChildrenTreeToList (childrenList, deepLevel, reduceList) {
  //   R.reduce((a, v) => {
  //     let list = []
  //     list = R.append(v, a)
  //     if (R.has('children', v)) {
  //       list = R.append(this._returnChildrenTreeToList(v.children, R.inc(deepLevel), reduceList), a)
  //     }
  //     return R.union(a, list)
  //   }, reduceList, childrenList)
  // }

  componentDidMount() {
    const data = this.props.category.activeCategory
    const parent = this.getParent(this.props.category.activeCategoryParent)
    this.setState({
      name: data.name,
      id: data.id,
      sort: data.sort,
      description: data.description,
      parent: parent.id
    })
    // this.getCategoryList()
  }

  handleChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }

  handleChangeSort(e) {
    this.setState({
      sort: e.target.value
    })
  }

  handleChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }
  handleChangeParent(e) {
    console.log(e.target.value)
    this.setState({
      parent: e.target.value
    })
  }

  handleUpdate() {
    this.props.actions.fetchUpdateCategory({id: this.state.id, data: this.state}).then(() => {
      this.props.commonActions.showMessageBox(SAVE_SUCCESS, SUCCESS)
      this.props.actions.fetchGetCategoryTreeBySelectedRootId(this.props.category.selectRootCategory)
      this.props.actions.fetchGetCategoryListBySelectedRootId(this.props.category.selectRootCategory);
      this.props.actions.fetchGetActiveCategoryChildren(this.props.category.activeCategory.id)
    })
  }

  getParent(list) {
    return isEmpty(init(list)) ? {id: ''} : last(init(list))
  }

  render() {
    const { classes } = this.props
    const selectList = difference(difference(this.props.category.categoryList, this.props.category.activeCategoryChildren), [this.props.category.removeRootCategory])
    return (
      <div className="category-category-edit">
        <Grid container>
          <Grid item xs={12}>
            <h3>分类内容编辑</h3>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="分类名称"
              variant="outlined"
              margin="normal"
              className={classes.textField}
              value={this.state.name}
              onChange={this.handleChangeName}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="简单说明"
              className={classes.textField}
              value={this.state.description}
              margin="normal"
              variant="outlined"
              onChange={this.handleChangeDescription}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="number"
              label="排序号: 大号靠前"
              className={classes.textField}
              value={this.state.sort}
              margin="normal"
              variant="outlined"
              onChange={this.handleChangeSort}
            />
          </Grid>
          {
            (not(isEmpty(this.state.parent))) &&
              <Grid item xs={12}>
                <TextField
                  select
                  label="父分类"
                  className={classes.textField}
                  value={this.state.parent}
                  margin="normal"
                  variant="outlined"
                  onChange={this.handleChangeParent}
                >
                {
                  map(i => <MenuItem key={i.id} value={i.id}>{i.name}</MenuItem>)(selectList)
                }
                </TextField>
              </Grid>
          }
          <Grid item xs={12}>
            <Button variant="contained" onClick={this.handleUpdate} className={classes.button} color="primary">保 存</Button>
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
    commonActions: bindActionCreators({ ...commonActions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CategoryEdit));

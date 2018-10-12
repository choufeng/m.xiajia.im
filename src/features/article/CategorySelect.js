import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Input, Select, Chip, MenuItem, Checkbox, ListItemText, InputLabel } from '@material-ui/core';
import * as R from 'ramda';


const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250
    }
  }
}
export class CategorySelect extends Component {
  static propTypes = {
    article: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props)
    this.state = {
      select: [],
      list: []
    }
    this.handleChangeValue = this.handleChangeValue.bind(this)
    this.getSelectedNameById = this.getSelectedNameById.bind(this)
    this.setCategoryList = this.setCategoryList.bind(this)
    this.setItemToList = this.setItemToList.bind(this)
    this.setPrev = this.setPrev.bind(this)
  }

  setCategoryList(node) {
    this.setState(preState => ({
      list: R.append(node, preState.list)
    }))
  }

  setPrev(item, level) {
    const prv = R.join('', R.repeat('　', level))
    return R.assoc('treeName', `${prv}├─ ${item.name}`, item)
  }

  setItemToList (item, level=0) {
    this.setCategoryList(this.setPrev(item, level))
    R.map(item => this.setItemToList(item, level + 2), item.children)
  }

  shouldComponentUpdate() {
    return true
  }

  componentWillMount() {
    this.setItemToList(this.props.category.categoryTree)
    const selectList = R.reduce((a, v) => R.append(v.id, a), [], this.props.selectValue)
    this.setState({
      select: selectList
    })
  }

  componentWillReceiveProps() {
    this.setState((prveState, props) => {
      return {
        select: R.reduce((a, v) => R.append(v.id, a), [], props.selectValue)
      }
    })
  }

  handleChangeValue(e) {
    this.setState({
      select: e.target.value
    })
    this.props.onChangeValue('categorys', e.target.value)
  }

  getSelectedNameById(id) {
    const categoryList = this.state.list
    const item = R.find(R.propEq('id', id))(categoryList)
    return item.name
  }

  render() {
    const {selectValue, classes} = this.props
    const {select} = this.state
    console.log('selectvalue', selectValue)
    const categoryList = this.state.list
    return (
      <div className="article-category-select">
        <InputLabel className={classes}>文章分类</InputLabel>
        <Select
          multiple
          placeholder="选择文章分类"
          value={select}
          variant="outlined"
          className={classes}
          MenuProps={MenuProps}
          input={<Input id="select-input" />}
          onChange={this.handleChangeValue}
          renderValue={selected => (
            <div>
              {selected.map(value => (
                <Chip key={value} label={this.getSelectedNameById(value)} />
              ))}
            </div>
          )}
        >
        {
          categoryList.map(item =>(
            <MenuItem key={item.id} value={item.id}>
              <Checkbox checked={this.state.select.indexOf(item.id) > -1} />
              <ListItemText primary={item.treeName} />
            </MenuItem>
          ))
        }
        </Select>
      </div>
    );
  }
}


/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    article: state.article,
    category: state.category,
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
)(CategorySelect);

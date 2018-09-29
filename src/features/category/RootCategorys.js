import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Grid, Select, MenuItem } from '@material-ui/core';
import { sortWith, descend, prop } from 'ramda';

export class RootCategorys extends Component {
  static propTypes = {
    category: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props)
    this.state = {
      selectId: '',
    }
    this.handleChangeRootCategory = this.handleChangeRootCategory.bind(this)
  }

  handleChangeRootCategory(e) {
    this.setState({
      selectId: e.target.value
    });
    this.props.actions.clearActiveCategory()
    this.props.actions.setSelectRootCategory(e.target.value)
    this.props.actions.fetchGetCategoryTreeBySelectedRootId(e.target.value);
    this.props.actions.fetchGetCategoryListBySelectedRootId(e.target.value);
  }

  render() {
    const list = sortWith([descend(prop('sort'))], this.props.category.rootCategoryList);
    return (
      <div className="category-root-categorys">
        <Grid container>
          <Grid item xs={12}>
            <h3>分类显示</h3>
          </Grid>
          <Grid item xs={12}>
            <Select value={this.state.selectId} onChange={this.handleChangeRootCategory} placeholder="请选择根分类" className="category-root-categorys-select">
            {
              list.map((i) => {
                return <MenuItem value={i.id} key={i.id}>{i.name}</MenuItem>
              })
            }
            </Select>
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
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RootCategorys);

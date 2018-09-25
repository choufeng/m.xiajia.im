import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import MaterialUiTree from 'material-ui-tree';

export class CategoryList extends Component {
  static propTypes = {
    category: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props)
    this.state = {}
    this.a = this.a.bind(this)
    this.b = this.b.bind(this)
    this.c = this.c.bind(this)
  }

  a (leafData, chdIndex, expand) {
    console.log('a', leafData, chdIndex, expand)
  }

  b (leafData, chdIndex, expand) {
    console.log('b', leafData, chdIndex, expand)
  }

  c (leafData, expand) {
    console.log('c', leafData, expand)
    const {name} = leafData;
    return (<b>{name}</b>);
  }

  render() {
    const data = this.props.category.categoryTree;
    return (
      <div className="category-category-list">
        <MaterialUiTree
          className="category-category-list-tree"
          labelName="name"
          valueName="id"
          childrenName="children"
          data={data}
          expandAll={true}
          renderLabel={this.c}
          requestChildrenData={this.b}
        ></MaterialUiTree>
      </div>
    )
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
)(CategoryList);

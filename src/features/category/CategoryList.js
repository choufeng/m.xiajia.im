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
    this.getTreeName = this.getTreeName.bind(this)
    this.handleClickTree = this.handleClickTree.bind(this)
    this.getActionsData = this.getActionsData.bind(this)
  }

  handleClickTree (data, chdIndex, expand) {
    this.props.actions.setActiveCategory(data)
  }

  getActionsData(data, index, expand) {
    console.log('getActionsData', data)
    return [
      {
        label: '查看',
        onClick: () => {
          this.props.actions.setActiveCategory(data)
        }
      }
    ]
  }

  getTreeName (leafData) {
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
          actionsAlignRight={true}
          renderLabel={this.getTreeName}
          getActionsData={this.getActionsData}
          requestChildrenData={this.handleClickTree} 
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

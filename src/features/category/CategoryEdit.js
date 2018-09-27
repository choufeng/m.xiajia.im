import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { TextField, Grid, Button, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { last, init, map, isEmpty, difference, not } from 'ramda';

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
      parent:''
    }
    this.getParent = this.getParent.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const data = this.props.category.activeCategory
    const parent = this.getParent(this.props.category.activeCategoryParent)
    this.setState({
      name: data.name,
      id: data.id,
      description: data.description,
      parent: parent.id
    })
  }

  handleChange(e) {
    this.setState({
      parent: e.target.value
    })
  }

  getParent(list) {
    return isEmpty(init(list)) ? {id: ''} : last(init(list))
  }

  render() {
    const { classes } = this.props
    const selectList = difference(this.props.category.categoryList, this.props.category.activeCategoryChildren)
    // const selectList = this.props.category.categoryList
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
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="简单说明"
              className={classes.textField}
              value={this.state.description}
              margin="normal"
              variant="outlined"
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
                  onChange={this.handleChange}
                >
                {
                  map(i => <MenuItem key={i.id} value={i.id}>{i.name}</MenuItem>)(selectList)
                }
                </TextField>
              </Grid>
          }
          <Grid item xs={12}>
            <Button variant="contained" className={classes.button} color="primary">保 存</Button>
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
)(withStyles(styles)(CategoryEdit));

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { TextField, Grid, Button, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '30rem'
  },
  button: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit,
    width: '30rem',
    height: '3.5rem'
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

  componentDidMount() {
    
  }

  render() {
    const data = this.props.category.activeCategory
    const { classes } = this.props
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
              value={data.name}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="简单说明"
              className={classes.textField}
              value={data.description}
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              filter
              select
              label="父节点"
              className={classes.textField}
              value={data.description}
              margin="normal"
              variant="outlined"
              onChange={this.handleChange}
            >
              <MenuItem>A</MenuItem>
              <MenuItem>A</MenuItem>
            </TextField>
          </Grid>
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

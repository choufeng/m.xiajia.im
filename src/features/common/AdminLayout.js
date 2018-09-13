import React, { Component } from 'react';
import {Grid} from '@material-ui/core';
import {SidePanel, TopPanel} from './';
export default class AdminLayout extends Component {
  static propTypes = {

  };

  render() {
    return (
      <div className="common-admin-layout">
        <Grid container spacing={0}>
          <Grid item xs={2} className="admin-layout-left">
            <SidePanel />
          </Grid>
          <Grid item xs={10} className="admin-layout-right">
            <Grid container spacing={0}>
              <Grid item xs={12} className="admin-layout-right-top">
                <TopPanel />
              </Grid>
              <Grid item xs={12} className="admin-layout-right-content">
                {this.props.children}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

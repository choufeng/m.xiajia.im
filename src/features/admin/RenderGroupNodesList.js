import React, { Component } from 'react';
import {map, addIndex, update} from 'ramda'
import Switch from '@material-ui/core/Switch'
import FromControllLabel from '@material-ui/core/FormControlLabel'

export default class RenderGroupNodesList extends Component {
  static propTypes = {
  };

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      list: this.props.list
    }
  }

  handleClick = index => e => {
    let data = this.state.list[index]
    data.selected = e.target.checked
    this.setState({
      list: update(index, data, this.state.list)
    })
    this.props.valueChanged(this.state.list[index]['nodekey'])
  }

  render() {
    return (
      <div className="admin-render-group-nodes-list">
        <h2>{this.props.list[0]['category']}</h2>
        <ul>
        {
          addIndex(map)((v, i) => {
            return (<li key={i}>
              <FromControllLabel control={
                <Switch checked={v.selected} value={v.name} onChange={this.handleClick(i)}></Switch>
              } label={v.name} />
            </li>)
          }, this.props.list)
        }
        </ul>
      </div>
    );
  }
}

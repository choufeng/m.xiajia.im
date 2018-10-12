import React, { Component } from 'react';
import Milk from 'react-milkdown';
import 'font-awesome/css/font-awesome.min.css';

export default class EditorForm extends Component {
  static propTypes = {
  };

  constructor(props) {
    super(props)
    this.state = {
      content: '**hello**'
    }
    this.handleChangeContent = this.handleChangeContent.bind(this)
  }

  shouldComponentUpdate() {
    return true
  }

  componentWillReceiveProps(nextProps) {
    this.setState((prveState, nextProps) => {
      return {
          content: nextProps.content
      }
    })
  }

  componentWillMount() {
    this.setState((prveState, props) => {
      return {
          content: props.content
      }
    })
  }

  handleChangeContent(value) {
    this.props.onContentChange(value)
    return value
  }

  render() {
    return (
      <div className="article-editor-form">
        <Milk
          value={this.state.content}
          onChange={this.handleChangeContent}
          style={{width: "100%"}}
        />
      </div>
    );
  }
}

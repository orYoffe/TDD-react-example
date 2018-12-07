import  React, { Component } from 'react';

class TodoForm extends Component {
  state = {
    text: ''
  }

  onInputChange = e => this.setState({ text: e.target.value });

  addTodo = () => {
    this.props.addTodo(this.state.text);
    this.setState({ text: '' });
  }

  render() {
    return (
      <form className="TodoForm">
        <h3>Write a Todo...</h3>
        <input
          type="text"
          value={this.state.text}
          placeholder="Clean socks.."
          onChange={this.onInputChange}
        />
        <button onClick={this.addTodo}>Add</button>
      </form>
    );
  }
}

export default TodoForm;

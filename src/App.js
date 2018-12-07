import  React, { Component } from 'react';
import Header from './Header';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

class App extends Component {
  state = {
    todos: []
  }

  componentDidMount() {
    this.setState({ todos: this.props.todos });
  }

  addTodo = title => {
    this.setState({ todos: [ ...this.state.todos, { id: Date.now(), title }] });
  }

  removeTodo = id => {
    const newTodos = this.state.todos.slice().filter(i => i.id !== id);
    this.setState({ todos: newTodos });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <TodoForm addTodo={this.addTodo}/>
        <TodoList todoItems={this.state.todos} removeTodo={this.removeTodo}/>
      </div>
    );
  }
}

export default App;

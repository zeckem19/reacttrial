import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import About from './components/pages/About'
import Todos from './components/Todos'
import Header from './components/layout/Header'
import './App.css';
import Addtodo from './components/Addtodo';
// import { v4 as uuid} from 'uuid';
import axios from 'axios';
// {
//   id: uuid(),
//   title: 'Tkae out trash',
//   completed: false
// },
// {
//   id: uuid(),
//   title: 'dinner',
//   completed: false
// },
// {
//   id: uuid(),
//   title: 'discussion',
//   completed: true


class App extends Component {
  state = {
    todos: []
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(res => this.setState({ todos:  res.data}))
  }
  // toggle complete
  markComplete = (id) => {
    this.setState({todos: this.state.todos.map(todo => {
      if(todo.id === id) {
        todo.completed = !todo.completed
      }
    return todo;
    })});
  }
  //add todo
  addTodo = (title) => {
    axios.post('https://jsonplaceholder.typicode.com/todos',{ title,completed:false})
      .then(res => this.setState({ todos: [...this.state.todos, res.data ]}))
    
  }
  //delete Todo
  delTodo = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res => this.setState({todos: [...this.state.todos.filter(todo => todo.id !== id)]}));
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route path="/app" render={props => (
              <React.Fragment>
                <Addtodo addTodo={this.addTodo} />
                <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo}/>
              </React.Fragment>
            )} />
            <Route path="/About" render={About}/>
          </div>
        </div>
      </Router>
    );
  }
}


export default App;

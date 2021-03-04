import React, { Component } from 'react';
import logo from './logo.svg';
//import './App.css';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      numPages: 2
    };

    this.handleChange() {
      this.setState({value: event.target.keyword});
      this.setState({numPages: event.target.numPages});
    }

    handleSubmit() {
      console.log('Search submitted to backend');
      event.preventDefault();
    }
  }
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiReponse: '' };
  }
  
  callAPI() {
    fetch("http://localhost:9000/testAPI")
        .then(res => res.text())
        .then(res => this.setState({ apiResponse: res }))
        .catch(err => err);
  }
  
  componentDidMount() {
    this.callAPI();
  }

  render() {
   // const apiReponse = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <p className="App-intro">{this.state.apiResponse}</p>
        <p>next paragrph</p>
      </div>
    );
  }
}

export default App;

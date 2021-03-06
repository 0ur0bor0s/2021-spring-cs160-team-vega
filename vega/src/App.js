// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;



import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './SearchBarComp.js';
import SearchResult from './SearchResultComp.js';


// this should be in a serparate class?
class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keyword: '',
      numPages: 2
    }
  }

  handleChange(event) {
    this.setState({value: event.target.keyword});
    this.setState({numPages: event.target.numPages});
  }

  handleSubmit(event) {
    console.log('Search submitted to backend');
    event.preventDefault();
  }
}


/* 
  Main class -- default page
  Will reformat later -- current use for feasibility prototype.
*/
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

  // **** DEFAULT **** //

//   render() {
//    // const apiReponse = this.state;
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </header>
//         <p className="App-intro">{this.state.apiResponse}</p>
//         <p>next paragrph</p>
//       </div>
//     );
//   }
// }



// **** FOR FEASIBILITY PROTOTYPE **** //
    render() {
      return (
        <div className="App">
          <h1>Search</h1>
          <div><SearchBar /></div>
          <h2>Results</h2>
          <div><SearchResult /></div>
        </div>
      );
    }
  }


export default App;

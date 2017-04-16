import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import './App.css';
import SearchBar from './components/search-bar';
import UsersList from './components/users-list';
import User from './components/user';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username : '',
      usersList: [],
    };

    this.appDoSearch = this.appDoSearch.bind(this);
  }

  appDoSearch(username, router) {
    // example: https://api.github.com/search/users?q=tom
    let url = window.encodeURI(`https://api.github.com/search/users?q=${username}`);

    return axios.get(url)
      .then((response) => {
        this.setState({
          usersList: response.data.items,
        });

        const { route: { location: { pathname: path } } } = router;
        if ( path !== '/' ) {
          router.history.push('/');
        }
      });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header>
            <h1>Github User Search</h1>
            <SearchBar appDoSearch={this.appDoSearch} />
          </header>

          <Route exact path="/" render={props => <UsersList usersList={this.state.usersList} {...props} />} />
          <Route exact path="/user/:uid" render={props => <User usersList={this.state.usersList} {...props} />} />
        </div>
      </Router>
    );
  }
}

export default App;

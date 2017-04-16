import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchBar extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      username: '',
    };

    this.onKeyUp = this.onKeyUp.bind(this);
    this.doSearch = this.doSearch.bind(this);
  }

  onKeyUp(event) {
    this.setState({ username: event.target.value });
    if ( event.keyCode === 13 ) {
      this.doSearch();
    }
  }

  doSearch() {
    this.props.appDoSearch(this.state.username, this.context.router);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-10">
            <input type="text" className="form-control search-bar" placeholder="Username"
                   onKeyUp={this.onKeyUp} />
            <p className="small-font">Enter a username to begin</p>
          </div>
          <div className="col-xs-2">
            <button className="btn btn-primary" onClick={this.doSearch}>Go</button>
          </div>
        </div>

      </div>
    );
  }
}

export default SearchBar;

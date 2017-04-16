import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedUser: {},
      reposList   : [],
    };
  }

  getRepos() {
    let url = window.encodeURI(`${this.state.selectedUser.repos_url}`);

    return axios.get(url)
      .then((response) => {
        this.setState({
          reposList: response.data,
        });
      });
  }

  componentDidMount() {
    let uid = this.props.match.params.uid;

    if ( !uid ) {
      return '';
    }

    let selectedUser = this.props.usersList.filter(u => {
      return u.id == uid;
    });

    if ( selectedUser[0] ) {
      this.setState({ selectedUser: selectedUser[0] }, () => {
        this.getRepos();
      });
    }
  }

  renderUser() {
    const renderDetails = () => {
      if ( Object.keys(this.state.selectedUser).length < 1 ) {
        return '';
      }

      let u = this.state.selectedUser;

      const strip = (str) => {
        if ( str ) {
          return str.replace(/{.*}/, '');
        }
        return str;
      };

      return (
        <div className="row">
          <div className="col-md-3 col-sm-3 users-list-item">
            <a href={u.url} target="_blank">
              <img src={u.avatar_url} alt={u.avatar_url} className="img-responsive users-list-avatar" />

              <div className="row">
                <div className="col-xs-6">
                  Score: <br />
                  <span className="badge">{u.score}</span>
                </div>
                <div className="col-xs-6">
                  Type: <br />
                  <span className="badge">{u.type}</span>
                </div>
              </div>

              <span className="username">{u.login}</span>
            </a>

          </div>
          <div className="col-md-9">
            <div className="users-list-item-details">
              <h2>API Links</h2>
              <a href={strip(u.events_url)} className="btn btn-primary" target="_blank">Events</a>
              <a href={u.followers_url} className="btn btn-primary" target="_blank">Followers</a>
              <a href={strip(u.following_url)} className="btn btn-primary" target="_blank">Following</a>
              <a href={strip(u.gist_url)} className="btn btn-primary" target="_blank">Gists</a>
              <a href={u.organizations_url} className="btn btn-primary" target="_blank">Organizations</a>
              <a href={u.received_events_url} className="btn btn-primary" target="_blank">Received Events</a>
              <a href={u.repos_url} className="btn btn-primary" target="_blank">Repos</a>
              <a href={strip(u.starred_url)} className="btn btn-primary" target="_blank">Starred</a>
              <a href={u.subscriptions_url} className="btn btn-primary" target="_blank">Subscriptions</a>
            </div>
          </div>
          {this.renderRepos()}
        </div>
      );
    };

    return (
      <div className="row">
        {renderDetails()}
      </div>
    );
  }

  renderRepos() {
    if ( this.state.reposList.length < 1 ) {
      return '';
    }
    return (
      <div className="col-md-9 users-list-item-details">
        <h2>Repos</h2>
        {this.state.reposList.map(r => {
          return <a href={r.html_url} className="btn btn-primary" target="_blank">{r.name}</a>;
        })}
      </div>
    );
  }

  render() {
    return (
      <div className="container users-list-container">
        <Link to="/" className="nav-link"> &lt; Back </Link>

        {this.renderUser()}
      </div>
    );
  }
}

export default User;

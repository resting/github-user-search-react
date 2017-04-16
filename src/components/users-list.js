import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UsersList extends Component {
  constructor(props) {
    super(props);

    this.renderList = this.renderList.bind(this);
  }

  renderList() {
    if ( this.props.usersList.length < 1 ) {
      return '';
    }

    return (
      <div className="row">
        {
          this.props.usersList.map((u) => {
            return (
              <div key={u.id} className="col-md-4 col-sm-6 users-list-item">
                <Link to={`user/${u.id}`}>
                  <img src={u.avatar_url} alt={u.avatar_url} className="img-responsive users-list-avatar" />
                  <span className="username">{u.login}</span>
                </Link>
              </div>
            );
          })
        }
      </div>
    );
  }

  render() {
    return (
      <div className="container users-list-container">
        {this.renderList()}
      </div>
    );
  }
}

export default UsersList;

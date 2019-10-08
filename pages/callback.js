import React, { Component } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import auth0Client from '../services/auth0';
import { withRouter } from 'next/router';

class Callback extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    auth0Client
      .HandleAuthentication()
      .then(res => console.log(res))
      .catch(err => {
        console.log(err);
      });
    this.props.router.push('/');
  }

  render() {
    return (
      <BaseLayout>
        <h1>Verifying user credentials</h1>
      </BaseLayout>
    );
  }
}

export default withRouter(Callback);

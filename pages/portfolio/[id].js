import React, { Component } from 'react';
import BaseLayout from '../../components/layouts/BaseLayout';
import { withRouter } from 'next/router';
import axios from 'axios';

class Porfolio extends Component {
  constructor(props) {
    super(props);
  }
  static async getInitialProps({ query }) {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${query.id}`
    );
    return { posts: response.data };
  }
  render() {
    const { title, body } = this.props.posts;

    return (
      <BaseLayout>
        <h1>{title}</h1>
        <p>{body}</p>
      </BaseLayout>
    );
  }
}

export default withRouter(Porfolio);

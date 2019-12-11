import React, { Component } from "react";
import axios from "axios";
import BaseLayout from "../../../components/layouts/BaseLayout";
import { withRouter } from "next/router";

class Portfolio extends Component {
  static async getInitialProps(context) {
    let post;
    try {
      post = await axios
        .get(`https://jsonplaceholder.typicode.com/posts/${context.query.id}`)
        .then(response => response.data);
    } catch (err) {
      err => console.log(err);
    }
    return { post };
  }

  render() {
    const { post } = this.props;
    return (
      <BaseLayout>
        <h1>I am [id].js page with the id of {post.id}</h1>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </BaseLayout>
    );
  }
}

export default withRouter(Portfolio);

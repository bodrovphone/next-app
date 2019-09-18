import React, { Component } from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import axios from "axios";
import Link from "next/link";

export default class Portfolios extends Component {
  static async getInitialProps() {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    return { posts: response.data.splice(0, 10) };
  }

  renderPosts(posts) {
    return posts.map((post, index) => (
      <li key={index}>
        <Link as={`/portfolio/${post.id}`} href={`/portfolio/[id]`}>
          <a>{post.title}</a>
        </Link>
      </li>
    ));
  }

  render() {
    const { posts } = this.props;
    return (
      <BaseLayout>
        <h1>I am a Portfolios Page!</h1>
        <ul>{this.renderPosts(posts)}</ul>
      </BaseLayout>
    );
  }
}

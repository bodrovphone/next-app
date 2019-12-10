import React, { Component } from "react";
import axios from "axios";
import BaseLayout from "../components/layouts/BaseLayout";
import Link from "next/link";

export default class Portfolios extends Component {
  static async getInitialProps() {
    let posts;
    try {
      posts = await axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then(response => response.data.splice(0, 10));
    } catch (err) {
      err => console.log(err);
    }
    return { posts };
  }

  renderPosts = posts => {
    return posts.map(post => (
      <li key={post.id + Math.random()}>
        <Link as={`/portfolio/${post.id}`} href="/portfolio/[id]">
          <a style={{ fontSize: "20px" }}>{post.title}</a>
        </Link>
      </li>
    ));
  };

  render() {
    const { posts } = this.props;
    return (
      <BaseLayout>
        <h1>I am Portfolios Page</h1>
        <ul>{this.renderPosts(posts)}</ul>
      </BaseLayout>
    );
  }
}

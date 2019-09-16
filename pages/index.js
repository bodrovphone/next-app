import React, { Component } from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import SuperComponent from "../components/superComponent";
import { log } from "util";

export default class index extends SuperComponent {
  constructor(props) {
    super(props);
    this.state = {
      title: "I am Index Page"
    };
    console.log("constructor");
  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  updateTitle = () => {
    this.setState({ title: "I am Updated Index Page" });
  };

  render() {
    console.log("render");
    return (
      <BaseLayout>
        <h1>I am a Header!</h1>
        <h2>{this.state.title}</h2>
        <button onClick={this.updateTitle}>Change Title</button>
      </BaseLayout>
    );
  }
}

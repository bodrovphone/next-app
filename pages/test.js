import React, { Component } from "react";
import BaseLayout from "../components/layouts/BaseLayout";

export default class Test extends Component {
  constructor(props) {
    super(props);
  }
  static async getInitialProps({ query }) {
    const testId = query.id;
    return { testId };
  }
  render() {
    const { testId } = this.props;
    return (
      <BaseLayout>
        <h1>I am Test Page {testId}</h1>
      </BaseLayout>
    );
  }
}

import React, { Component } from "react";
import BaseLayout from "../../components/layouts/BaseLayout";
import { withRouter } from "next/router";

class Porfolio extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("portfolio", this.props);

    return (
      <BaseLayout>
        <h1>Hello I am a Portfolio-single Page!</h1>
        <h2>{this.props.router.query.id}</h2>
      </BaseLayout>
    );
  }
}

export default withRouter(Porfolio);

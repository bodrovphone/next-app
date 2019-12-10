import React, { Component } from "react";
import axios from "axios";
import BaseLayout from "../../components/layouts/BaseLayout";
import { withRouter } from "next/router";

class Portfolio extends Component {
  render() {
    return (
      <BaseLayout>
        <h1>I am Portfolios Page</h1>
        <h2>{this.props.router.query.id}</h2>
      </BaseLayout>
    );
  }
}

export default withRouter(Portfolio);

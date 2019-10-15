import React, { Component } from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import Auth0Client from "../services/auth0";
import { withRouter } from "next/router";

class Callback extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    await Auth0Client.handleAuthentication();
    this.props.router.push("/");
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

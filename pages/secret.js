import React, { Component } from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";
import withAuth from "../components/hoc/withAuth";
import axios from "axios";

class Secret extends Component {
  constructor() {
    super();
    this.state = {
      secretData: []
    };
  }
  static getInitialProps() {
    const superSecretValue = "pizdec";

    return { superSecretValue };
  }

  async componentDidMount() {
    const res = await axios.get("/api/v1/secret");
    const secretData = res.data;
    this.setState({ secretData });
  }

  displaySecretData = () => {
    const { secretData } = this.state;
    if (secretData && secretData.length) {
      return secretData.map((item, index) => {
        return (
          <>
            <p key={index + "-title"}>{item.title}</p>
            <p key={index + "-desc"}>{item.description}</p>
          </>
        );
      });
    }
  };

  render() {
    const { superSecretValue } = this.props;
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage>
          <h1>I am Secret Page</h1>
          <h2>{superSecretValue}</h2>
          {this.displaySecretData()}
        </BasePage>
      </BaseLayout>
    );
  }
}

export default withAuth(Secret);

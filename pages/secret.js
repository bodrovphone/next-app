import React, { Component } from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";
import withAuth from "../components/hoc/withAuth";
import { getSecretData } from "../actions";

class Secret extends Component {
  constructor() {
    super();
    this.state = {
      secretData: []
    };
  }
  static async getInitialProps({ req }) {
    // the same as process.browser but more secure maybe?
    // see https://github.com/zeit/next.js/issues/5354#issuecomment-440903920
    // let inBrowser = typeof window !== "undefined";

    const anotherSecretData = await getSecretData(req);
    return { anotherSecretData };
  }

  async componentDidMount() {
    const secretData = await getSecretData();
    this.setState({ secretData });
  }

  displaySecretData = () => {
    const { secretData } = this.state;
    if (secretData && secretData.length) {
      return secretData.map((item, index) => {
        return (
          <React.Fragment key={index + "secret_item"}>
            <p>{item.title}</p>
            <p>{item.description}</p>
          </React.Fragment>
        );
      });
    }
  };

  render() {
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage>
          <h1>I am Secret Page</h1>
          {this.displaySecretData()}
        </BasePage>
      </BaseLayout>
    );
  }
}

export default withAuth(Secret);

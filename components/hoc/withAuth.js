import React from "react";
import BaseLayout from "../layouts/BaseLayout";
import BasePage from "../BasePage";

const withAuth = Component => {
  return class withAuth extends React.Component {
    static async getInitialProps(args) {
      const pageProps =
        (await Component.getInitialProps) &&
        (await Component.getInitialProps(args));
      return { ...pageProps };
    }
    renderConditional = () => {
      const { isAuthenticated } = this.props.auth;
      if (isAuthenticated) {
        return <Component {...this.props} />;
      } else {
        return (
          <BaseLayout {...this.props.auth}>
            <BasePage>
              <div>Oops...not authorizes to see this page</div>
            </BasePage>
          </BaseLayout>
        );
      }
    };
    render() {
      return this.renderConditional();
    }
  };
};

export default withAuth;

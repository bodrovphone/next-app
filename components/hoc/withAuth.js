import React from "react";
import BaseLayout from "../layouts/BaseLayout";
import BasePage from "../BasePage";

const nameSpace = "http://localhost:3000/";

const withAuth = (Component, role) => {
  return class withAuth extends React.Component {
    static async getInitialProps(args) {
      const pageProps =
        (await Component.getInitialProps) &&
        (await Component.getInitialProps(args));
      return { ...pageProps };
    }
    renderConditional = () => {
      const { isAuthenticated, user } = this.props.auth;
      const userRole = user?.[`${nameSpace}role${role}`];
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

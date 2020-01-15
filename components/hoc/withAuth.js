import React from "react";
import BaseLayout from "../layouts/BaseLayout";
import BasePage from "../BasePage";

const nameSpace = "http://localhost:3000/";

export default role => Component =>
  class withAuth extends React.Component {
    static async getInitialProps(args) {
      const pageProps =
        (await Component.getInitialProps) &&
        (await Component.getInitialProps(args));
      return { ...pageProps };
    }
    renderConditional = () => {
      const { isAuthenticated, user } = this.props.auth;
      const userRole = user && user[`${nameSpace}role`];
      let isAuthorized = false;
      if (role) {
        if (userRole && userRole === role) {
          isAuthorized = true;
        }
      } else {
        isAuthorized = true;
      }

      if (isAuthenticated && isAuthorized) {
        return <Component {...this.props} />;
      } else {
        return (
          <BaseLayout {...this.props.auth}>
            <BasePage className="base-page">
              <h2>
                Oops...you're not
                {!isAuthenticated ? " authenticated" : " authorized"} to see
                this page
              </h2>
            </BasePage>
          </BaseLayout>
        );
      }
    };
    render() {
      return this.renderConditional();
    }
  };

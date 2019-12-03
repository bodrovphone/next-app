import React from "react";
import Header from "../shared/Header";
import { Container } from "reactstrap";
import PropTypes from "prop-types";

const BaseLayout = props => {
  const { children, className, auth } = props;
  return (
    <div className="layout-container">
      <Header auth={auth} />
      <main className={`cover ${className}`}>
        <div className="wrapper">
          <Container className={`base-page ${className}`}>{children}</Container>
        </div>
      </main>
    </div>
  );
};

// BaseLayout.propTypes = {
//   className: PropTypes.any.isRequired
// };

export default BaseLayout;

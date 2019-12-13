import React from "react";
import Header from "../shared/Header";

const BaseLayout = props => {
  const { children, className, auth } = props;
  return (
    <div className="layout-container">
      <Header auth={auth} />
      <main className={`cover ${className}`}>
        <div className="wrapper">{children}</div>
      </main>
    </div>
  );
};

export default BaseLayout;

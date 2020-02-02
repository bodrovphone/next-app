import React, { Component } from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";
import withAuth from "../components/hoc/withAuth";

import { Col, Row } from "reactstrap";

import PortfolioForm from "../components/portfolioForm/PortfolioForm";

class PortfolioNew extends Component {
  render() {
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage
          className="portfolio-create -page"
          title="Create New Portfolio"
        >
          <Row>
            <Col md="6">
              <PortfolioForm onClick={vars => console.log(...vars)} />
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default withAuth("siteOwner")(PortfolioNew);
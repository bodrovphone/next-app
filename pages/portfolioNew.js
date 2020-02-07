import React, { Component } from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";
import withAuth from "../components/hoc/withAuth";
import { createPortfolio } from "../actions";
import Router from "next/router";

import { Col, Row } from "reactstrap";

import PortfolioForm from "../components/portfolioForm/PortfolioForm";

class PortfolioNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: undefined
    };
  }

  savePortfolio = (portfolioValues, { setSubmitting }) => {
    setSubmitting(true);
    createPortfolio(portfolioValues)
      .then(portfolio => {
        setSubmitting(false);
        this.setState({ error: undefined });
        Router.push("/portfolios");
      })
      .catch(e => {
        setSubmitting(false);
        let error = e.message || "server fucking error";
        this.setState({ error });
      });
  };

  render() {
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage
          className="portfolio-create -page"
          title="Create New Portfolio"
        >
          <Row>
            <Col md="6">
              <PortfolioForm
                onClick={vars => console.log(...vars)}
                onSubmit={this.savePortfolio}
                error={this.state.error}
              />
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default withAuth("siteOwner")(PortfolioNew);

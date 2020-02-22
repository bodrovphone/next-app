import React, { Component } from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";
import { PortfolioCard } from "../components/portfolio/portfolioCard";
import {
  getPortfolios,
  deletePortfolio as deletePortfolioAction
} from "../actions";
import Router from "next/router";

import { Row, Col, Button } from "reactstrap";

export default class Portfolios extends Component {
  static async getInitialProps() {
    let portfolios;
    try {
      portfolios = await getPortfolios();
    } catch (err) {
      err => console.log(err);
    }
    // console.log("PORTFOLIOS MATHA FACA", portfolios);
    return { portfolios };
  }

  displayDeleteWarning = (id, e) => {
    e.stopPropagation();

    const confirmed = window.confirm("U sure want to delete this ah?");
    if (confirmed) {
      // delete portfolio here
      this.deletePortfolioMethod(id);
    }
  };

  deletePortfolioMethod = portfolioId => {
    deletePortfolioAction(portfolioId)
      .then(() => {
        console.log("DELETED");
        Router.push("/portfolios");
      })
      .catch(e => console.log(e));
  };

  navigateToEdit = (id, e) => {
    e.stopPropagation();
    Router.push(`/portfolios/portfolio/${id}/edit`);
  };

  renderPortfolios = portfolios => {
    const { isAuthenticated, isSiteOwner } = this.props.auth;
    return portfolios.map((portfolio, index) => (
      <Col md="4" key={index}>
        <PortfolioCard portfolio={portfolio}>
          {isAuthenticated && isSiteOwner && (
            <React.Fragment>
              <Button
                onClick={e => this.navigateToEdit(portfolio._id, e)}
                color="warning"
              >
                {" "}
                Edit
              </Button>{" "}
              <Button
                color="danger"
                onClick={e => this.displayDeleteWarning(portfolio._id, e)}
              >
                Delete
              </Button>
            </React.Fragment>
          )}
        </PortfolioCard>
      </Col>
    ));
  };

  render() {
    const {
      portfolios,
      auth: { isAuthenticated, isSiteOwner }
    } = this.props;
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage className="portfolio-page" title="Portfolios">
          {isAuthenticated && isSiteOwner && (
            <Button
              onClick={() => Router.push("/portfolioNew")}
              className="create-btn"
              color="success"
            >
              Create Portfolio
            </Button>
          )}
          <Row>{this.renderPortfolios(portfolios)}</Row>
        </BasePage>
      </BaseLayout>
    );
  }
}

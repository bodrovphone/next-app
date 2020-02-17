import React, { Component } from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";
import { getPortfolios } from "../actions";
import Router from "next/router";

import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardHeader,
  Row,
  Col,
  Button
} from "reactstrap";

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

  renderPortfolios = portfolios => {
    return portfolios.map((portfolio, index) => (
      <Col md="4" key={index}>
        <span>
          <Card className="portfolio-card">
            <CardHeader className="portfolio-card-header">
              {portfolio.position}
            </CardHeader>
            <CardBody>
              <p className="portfolio-card-city"> {portfolio.location} </p>
              <CardTitle className="portfolio-card-title">
                {portfolio.title}
              </CardTitle>
              <CardSubtitle>{portfolio.company}</CardSubtitle>
              <CardText className="portfolio-card-description">
                {portfolio.description}
              </CardText>
              <div className="readMore">...</div>
              {
                <React.Fragment>
                  <Button
                    onClick={() =>
                      Router.push(`/portfolios/portfolio/${portfolio._id}/edit`)
                    }
                    color="warning"
                  >
                    {" "}
                    Edit
                  </Button>{" "}
                  <Button color="danger">Delete</Button>
                </React.Fragment>
              }
            </CardBody>
          </Card>
        </span>
      </Col>
    ));
  };

  render() {
    const { portfolios } = this.props;
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage className="portfolio-page" title="Portfolios">
          <Button
            onClick={() => Router.push("/portfolioNew")}
            className="create-btn"
            color="success"
          >
            Create Portfolio
          </Button>
          <Row>{this.renderPortfolios(portfolios)}</Row>
        </BasePage>
      </BaseLayout>
    );
  }
}

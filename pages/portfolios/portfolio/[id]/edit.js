import React, { Component } from "react";
import BaseLayout from "../../../../components/layouts/BaseLayout";
import BasePage from "../../../../components/BasePage";
import { updatePortfolio, getPorfolioById } from "../../../../actions";
import Router from "next/router";

import { Col, Row } from "reactstrap";

import PortfolioForm from "../../../../components/portfolioForm/PortfolioForm";

class edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: undefined,
    };
  }
  static async getInitialProps({ query }) {
    let portfolio = {};
    try {
      // try context.params.id but provide just context
      portfolio = await getPorfolioById(query.id);
      console.log(portfolio, "Am I grut?");
    } catch (err) {
      // console.error(err);
    }
    console.log(portfolio, " I AM GRUT");
    return { portfolio };
  }

  updateP = (portfolioValues, { setSubmitting }) => {
    setSubmitting(true);
    updatePortfolio(portfolioValues)
      .then(() => {
        setSubmitting(false);
        this.setState({ error: undefined });
        Router.push("/portfolios");
      })
      .catch((e) => {
        setSubmitting(false);
        let error = e.message || "server fucking error";
        this.setState({ error });
      });
  };

  render() {
    const { portfolio } = this.props;
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage className="portfolio-create -page" title="Update Portfolio">
          <Row>
            <Col md="6">
              <PortfolioForm
                initialValues={portfolio}
                onClick={(vars) => console.log(...vars)}
                onSubmit={this.updateP}
                error={this.state.error}
              />
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default edit;

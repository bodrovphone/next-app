import React, { useState } from "react";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardHeader,
  Button
} from "reactstrap";
import { PortfolioModal } from "./portfolioModal";

export const PortfolioCard = props => {
  const { portfolio, children } = props;

  const [isOpen, setModal] = useState(false);
  const toggle = () => setModal(!isOpen);

  return (
    <span onClick={toggle}>
      <PortfolioModal toggle={toggle} portfolio={portfolio} isOpen={isOpen} />
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
          <div className="readMore">{children}</div>
        </CardBody>
      </Card>
    </span>
  );
};

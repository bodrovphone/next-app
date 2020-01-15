import React, { Component } from "react";
import axios from "axios";
import BaseLayout from "../components/layouts/BaseLayout";
import Link from "next/link";
import BasePage from "../components/BasePage";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardHeader,
  Row,
  Col
} from "reactstrap";

export default class Portfolios extends Component {
  static async getInitialProps() {
    let posts;
    try {
      posts = await axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then(response => response.data.splice(0, 10));
    } catch (err) {
      err => console.log(err);
    }
    return { posts };
  }

  renderPosts = posts => {
    return posts.map((post, index) => (
      <Col md="4" key={index}>
        <span>
          <Card className="portfolio-card">
            <CardHeader className="portfolio-card-header">
              Some Position {index}
            </CardHeader>
            <CardBody>
              <p className="portfolio-card-city"> Some Location {index} </p>
              <CardTitle className="portfolio-card-title">
                Some Company {index}
              </CardTitle>
              <CardText className="portfolio-card-text">
                Some Description {index}
              </CardText>
              <div className="readMore"> </div>
            </CardBody>
          </Card>
        </span>
      </Col>
    ));
  };

  render() {
    const { posts } = this.props;
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage className="portfolio-page" title="Portfolios">
          <Row>{this.renderPosts(posts)}</Row>
        </BasePage>
      </BaseLayout>
    );
  }
}

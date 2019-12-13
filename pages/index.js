import React, { Component } from "react";
import { Container, Col, Row } from "reactstrap";
import Typed from "react-typed";

import axios from "axios";

import BaseLayout from "../components/layouts/BaseLayout";

export default class Index extends Component {
  constructor(props) {
    super(props);

    this.roles = [
      "Developer",
      "Tech Lover",
      "Team Player",
      "ReactJS, HTML, JS"
    ];
  }

  // static async getInitialProps() {
  //   /* KEEP IT FOR TESTING IF YOU GET INTO TROUBLES LATER
  //    * basically this block explains everything,
  //    * almost everything about getInitial props and how it behaves
  //    * it literally stops the page from returning from server until
  //    *
  //     console.log("I am getInitialProps");
  //       let initialData = [];
  //       await new Promise(resolve => setTimeout(resolve, 2000)).then(
  //         (initialData = [1, 2, 3, 4, 5])
  //       );
  //     return { initialData };
  //    */

  //   //  ==== **** === ****
  //    let initialData;
  //   try {
  //     initialData = await axios
  //       .get("https://jsonplaceholder.typicode.com/todos/1")
  //       .then(response => response.data);
  //   } catch (err) {
  //     err => console.log(err);
  //   }
  //   return { initialData: initialData };
  // }

  render() {
    const { initialData } = this.props;
    return (
      <BaseLayout className="cover">
        <div className="main-section">
          <div className="background-image">
            <img src="/static/images/background-index.png" />
          </div>

          <Container>
            <Row>
              <Col md="6">
                <div className="hero-section">
                  <div className={`flipper`}>
                    <div className="back">
                      <div className="hero-section-content">
                        <h2> Full Stack Web Developer </h2>
                        <div className="hero-section-content-intro">
                          Have a look at my portfolio and job history.
                        </div>
                      </div>
                      <img
                        className="image"
                        src="/static/images/section-1.png"
                      />
                      <div className="shadow-custom">
                        <div className="shadow-inner"> </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md="6" className="hero-welcome-wrapper">
                <div className="hero-welcome-text">
                  <h1>
                    Welcome to the portfolio website of Filip Jerga. Get
                    informed, collaborate and discover projects I was working on
                    through the years!
                  </h1>
                </div>
                <Typed
                  loop
                  typeSpeed={50}
                  backSpeed={40}
                  strings={this.roles}
                  smartBackspace
                  backDelay={1000}
                  loopCount={0}
                  showCursor
                  cursorChar="|"
                  className="self-typed"
                />
                <div className="hero-welcome-bio">
                  <h1>Let's take a look on my work.</h1>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </BaseLayout>
    );
  }
}

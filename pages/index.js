import React, { Component } from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import { Button, Container } from "reactstrap";

export default class index extends Component {
  render() {
    return (
      <BaseLayout>
        <Container>
          <Button color="danger">Danger!</Button>
        </Container>
      </BaseLayout>
    );
  }
}

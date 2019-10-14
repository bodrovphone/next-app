import React, { Component } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';

export default class About extends Component {
  render() {
    return (
      <BaseLayout {...this.props}>
        <h1>I am About Page</h1>
      </BaseLayout>
    );
  }
}

import React, { Component } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';

export default class Cv extends Component {
  render() {
    return (
      <BaseLayout {...this.props}>
        <h1>Hello I am a CV Page!</h1>
      </BaseLayout>
    );
  }
}

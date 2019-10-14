import React, { Component } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';

export default class Blogs extends Component {
  render() {
    return (
      <BaseLayout {...this.props}>
        <h1>Hello I am a Blogs Page!</h1>
      </BaseLayout>
    );
  }
}

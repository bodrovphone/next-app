import React, { Component } from "react";
import axios from "axios";

import BaseLayout from "../components/layouts/BaseLayout";

import "bootstrap/dist/css/bootstrap.min.css";

export default class Index extends Component {
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
      <BaseLayout>
        <h1>Welcome Page!</h1>
      </BaseLayout>
    );
  }
}

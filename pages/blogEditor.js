import React, { Component } from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";

import withAuth from "../components/hoc/withAuth";
import HoverMenu from "../components/slate-editor/HoverMenu";

class BlogEditor extends Component {
  render() {
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage className="blog-editor-page" title="Write your story">
          <HoverMenu />
        </BasePage>
      </BaseLayout>
    );
  }
}

export default withAuth("siteOwner")(BlogEditor);

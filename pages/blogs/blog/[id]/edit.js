import React, { Component } from "react";
import BaseLayout from "../../../../components/layouts/BaseLayout";
import BasePage from "../../../../components/BasePage";

import withAuth from "../../../../components/hoc/withAuth";
import HoverMenu from "../../../../components/slate-editor/hoverMenu";

import { getBlogById } from "../../../../actions";

class BlogEditorUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSaving: false,
    };
  }
  static async getInitialProps({ query }) {
    const blogId = query.id;

    try {
      const blog = await getBlogById(blogId);
      console.log(blog);
      return { blog };
    } catch (e) {
      return { e };
    }
  }

  render() {
    const { blog, auth } = this.props;
    const { isSaving } = this.state;

    return (
      <BaseLayout {...auth}>
        <BasePage containerClass="editor-wrapper" className="blog-editor-page">
          <HoverMenu isSaving={isSaving} />
        </BasePage>
      </BaseLayout>
    );
  }
}

export default withAuth("siteOwner")(BlogEditorUpdate);

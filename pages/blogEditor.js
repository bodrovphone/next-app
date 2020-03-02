import React, { useState } from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";

import withAuth from "../components/hoc/withAuth";
import HoverMenu from "../components/slate-editor/hoverMenu";
import ControlMenu from "../components/slate-editor/ControlMenu";

const BlogEditor = props => {
  const saveBlog = ({ title, subTitle }) => {
    console.log("Done, mother fucker!", { title, subTitle });
  };

  return (
    <BaseLayout {...props.auth}>
      <BasePage containerClass="editor-wrapper" className="blog-editor-page">
        <HoverMenu save={saveBlog} />
      </BasePage>
    </BaseLayout>
  );
};

export default withAuth("siteOwner")(BlogEditor);

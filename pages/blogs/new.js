import React, { useState } from "react";
import BaseLayout from "../../components/layouts/BaseLayout";
import BasePage from "../../components/BasePage";

import withAuth from "../../components/hoc/withAuth";
import HoverMenu from "../../components/slate-editor/hoverMenu";
import { createBlog } from "../../actions";

const BlogEditor = (props) => {
  const [isSaving, setIsSaving] = useState(false);

  const saveBlogEditor = (newBlog) => {
    setIsSaving(true);
    createBlog(newBlog)
      .then((data) => {
        setIsSaving(false);
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <BaseLayout {...props.auth}>
      <BasePage containerClass="editor-wrapper" className="blog-editor-page">
        <HoverMenu isSaving={isSaving} save={saveBlogEditor} />
      </BasePage>
    </BaseLayout>
  );
};

export default withAuth("siteOwner")(BlogEditor);

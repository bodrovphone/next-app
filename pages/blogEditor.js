import React, { useState } from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";

import withAuth from "../components/hoc/withAuth";
import HoverMenu from "../components/slate-editor/hoverMenu";
import ControlMenu from "../components/slate-editor/ControlMenu";
import { saveBlog } from "../actions";

const BlogEditor = props => {
  const [isSaving, setIsSaving] = useState(false);

  const saveBlogEditor = ({ title, subTitle }) => {
    setIsSaving(true);
    console.log("Done, mother fucker!", { title, subTitle });
    saveBlog({ title, subTitle }).then(data => {
      setIsSaving(false);
      console.log(data);
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

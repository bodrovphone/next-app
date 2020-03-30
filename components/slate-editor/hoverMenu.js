import React, {
  useState,
  useMemo,
  useRef,
  useEffect,
  useCallback
} from "react";
import { Slate, Editable, ReactEditor, withReact, useSlate } from "slate-react";
import { Editor, Transforms, Text, createEditor } from "slate";
import { css } from "emotion";
import { withHistory } from "slate-history";

import { Button, Icon, Menu, Portal } from "./components";
import { Range } from "slate";

import initialValue from "./initialValue";
import ControlMenu from "./ControlMenu";

import { serialize, deserialize } from "./serialize";

const toggleFormat = (editor, format) => {
  const isActive = isFormatActive(editor, format);
  Transforms.setNodes(
    editor,
    { [format]: isActive ? null : true },
    { match: Text.isText, split: true }
  );
};

const isFormatActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: n => n[format] === true,
    mode: "all"
  });
  return !!match;
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underlined) {
    children = <u>{children}</u>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  return <span {...attributes}>{children}</span>;
};

const HoveringToolbar = () => {
  const ref = useRef();
  const editor = useSlate();

  useEffect(() => {
    const el = ref.current;
    const { selection } = editor;

    if (!el) {
      return;
    }

    if (
      !selection ||
      !ReactEditor.isFocused(editor) ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ""
    ) {
      el.removeAttribute("style");
      return;
    }

    const domSelection = window.getSelection();
    const domRange = domSelection.getRangeAt(0);
    const rect = domRange.getBoundingClientRect();
    el.style.opacity = 1;
    el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`;
    el.style.left = `${rect.left +
      window.pageXOffset -
      el.offsetWidth / 2 +
      rect.width / 2}px`;
  });

  return (
    <Portal document={globalThis.document || { body: "body" }}>
      <Menu
        ref={ref}
        className={css`
          padding: 8px 7px 6px;
          position: absolute;
          z-index: 1;
          top: -10000px;
          left: -10000px;
          margin-top: -6px;
          opacity: 0;
          background-color: #222;
          border-radius: 4px;
          transition: opacity 0.75s;
        `}
      >
        <FormatButton format="bold" icon="format_bold" />
        <FormatButton format="italic" icon="format_italic" />
        <FormatButton format="underlined" icon="format_underlined" />
        <FormatButton format="code" icon="code" />
        <BlockButton format="heading-one" icon="looks_one" />
        <BlockButton format="heading-two" icon="looks_two" />
        <BlockButton format="block-quote" icon="format_quote" />
        <BlockButton format="bulleted-list" icon="format_list_bulleted" />
        <BlockButton format="numbered-list" icon="format_list_numbered" />
      </Menu>
    </Portal>
  );
};

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: n => n.type === format
  });

  return !!match;
};

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: n => LIST_TYPES.includes(n.type),
    split: true
  });

  Transforms.setNodes(editor, {
    type: isActive ? "paragraph" : isList ? "list-item" : format
  });

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const BlockButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      reversed
      active={isBlockActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "heading-one":
      return <h1 {...attributes}>{children}</h1>;
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const FormatButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      reversed
      active={isFormatActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault();
        toggleFormat(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};

const HoverMenu = props => {
  const [value, setValue] = useState(initialValue);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const renderElement = useCallback(props => <Element {...props} />, []);

  const getValues = () => {
    // this is well a subFunction-helper. Yes, I'll need to re-do it later...
    // or I need to completely replace it with serialize helper
    const extractText = arr => {
      return (
        arr &&
        arr.children &&
        arr.children.reduce(
          (accumulator, currentValue) => accumulator + currentValue.text,
          ""
        )
      );
    };
    // Here I am getting titles from value if there are any or setting some defaults
    const headingOne = value.find(item => item.type === "heading-one");
    const title = extractText(headingOne) || "default title";
    // I can use value.filter(item => item.type === "heading-one")[0] or 1,2,3 etc;
    const headingTwo = value.find(item => item.type === "heading-two");
    const subTitle = extractText(headingTwo) || "default subtitle";
    // and now pass them trough to the upper component - better to use contextAPI here but I never used it...
    // So this one below would return me an html tag element as it is.
    var story = value
      .filter(item => {
        // I mean this is bad practise. Considering the above code this DRY violation
        // NEEDS REFACTORING
        return item.type !== "heading-one" && item.type !== "heading-two";
      })
      .map(serialize)
      .join(" ");
    !props.isSaving &&
      props.save({
        title,
        subTitle,
        story
      });
  };

  return (
    <Slate editor={editor} value={value} onChange={value => setValue(value)}>
      <ControlMenu isSaving={props.isSaving} save={getValues} />
      <HoveringToolbar />
      <Editable
        renderLeaf={props => <Leaf {...props} />}
        renderElement={renderElement}
        placeholder="Enter some text..."
        onDOMBeforeInput={event => {
          switch (event.inputType) {
            case "formatBold":
              return toggleFormat(editor, "bold");
            case "formatItalic":
              return toggleFormat(editor, "italic");
            case "formatUnderline":
              return toggleFormat(editor, "underline");
            case "formatCode":
              return toggleFormat(editor, "code");
          }
        }}
      />
    </Slate>
  );
};

export default HoverMenu;

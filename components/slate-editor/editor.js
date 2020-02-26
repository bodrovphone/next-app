// Import React dependencies.
import React, { useEffect, useMemo, useState, useCallback } from "react";
// Import the Slate editor factory.

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from "slate-react";

// Import the `Editor` helpers from Slate.
import { Editor, createEditor, Transforms, Text } from "slate";

const SlateEditor = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }]
    }
  ]);

  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />;
  }, []);

  return (
    <Slate editor={editor} value={value} onChange={value => setValue(value)}>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={event => {
          if (!event.ctrlKey) {
            return;
          }

          switch (event.key) {
            case "`": {
              event.preventDefault();
              const [match] = Editor.nodes(editor, {
                match: n => n.type === "code"
              });
              Transforms.setNodes(
                editor,
                { type: match ? null : "code" },
                { match: n => Editor.isBlock(editor, n) }
              );
              break;
            }

            case "b": {
              event.preventDefault();
              Transforms.setNodes(
                editor,
                { bold: true },
                { match: n => Text.isText(n), split: true }
              );
              break;
            }
          }
        }}
      />
    </Slate>
  );
};

const CodeElement = props => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

const DefaultElement = props => {
  return <p {...props.attributes}>{props.children}</p>;
};

const Leaf = props => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? "bold" : "normal" }}
    >
      {props.children}
    </span>
  );
};

export { SlateEditor };

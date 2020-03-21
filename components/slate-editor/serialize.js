import escapeHtml from "escape-html";
import { Node, Text } from "slate";
import { jsx } from "slate-hyperscript";

// this little helper will qualify what type of leaf do I get. whether it's bold or italic or whatever...
const leafQualifier = v => Object.keys(v).find(i => i !== "text");

const serialize = node => {
  try {
    // Here our leaves just work in the other way
    // we have nodes like {text: "some text", bold: true} or italic: true or someting. Can't use switch case here?
    if (Text.isText(node)) {
      switch (leafQualifier(node)) {
        case "bold":
          return `<stong>${escapeHtml(node.text)}</strong>`;
        case "italic":
          return `<em>${escapeHtml(node.text)}</em>`;
        case "underlined":
          return `<u>${escapeHtml(node.text)}</u>`;
        case "code":
          return `<code>${escapeHtml(node.text)}</code>`;
        default:
          return escapeHtml(node.text);
      }
    }

    const children = node.children.map(n => serialize(n)).join("");
    switch (node.type) {
      case "quote":
        return `<blockquote><p>${children}</p></blockquote>`;
      case "paragraph":
        return `<p>${children}</p>`;
      case "link":
        return `<a href="${escapeHtml(node.url)}">${children}</a>`;
      case "block-quote":
        return `<blockquote>${children}</blockquote>`;
      case "bulleted-list":
        return `<ul>${children}</ul>`;
      case "heading-one":
        return `<h1>${children}</h1>`;
      case "heading-two":
        return `<h2>${children}</h2>`;
      case "list-item":
        return `<li>${children}</li>`;
      case "numbered-list":
        return `<ol>${children}</ol>`;
      default:
        return children;
    }
  } catch (e) {
    // just a little fun here, styling logs...
    console.group(
      "%c☢️ Error , inside serialize.js function, check the input node object - ",
      "color: #fc5e03;"
    );
    console.error(e);
    console.groupEnd(
      "%c☢️ Error, inside serialize.js function, check the input node object - ",
      "color: #fc5e03;"
    );
  }
};

const deserialize = el => {
  if (el.nodeType === 3) {
    return el.textContent;
  } else if (el.nodeType !== 1) {
    return null;
  }

  const children = Array.from(el.childNodes).map(deserialize);

  switch (el.nodeName) {
    case "BODY":
      return jsx("fragment", {}, children);
    case "BR":
      return "\n";
    case "BLOCKQUOTE":
      return jsx("element", { type: "quote" }, children);
    case "P":
      return jsx("element", { type: "paragraph" }, children);
    case "A":
      return jsx(
        "element",
        { type: "link", url: el.getAttribute("href") },
        children
      );
    default:
      return el.textContent;
  }
};

export { serialize, deserialize };

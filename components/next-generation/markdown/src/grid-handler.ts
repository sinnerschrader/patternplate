import * as Select from "unist-util-select";
import * as toHast from "mdast-util-to-hast";

export const gridHandler = (h, grid) => {
  const node = {
    type: "element",
    tagName: "x-grid",
    children: Select.selectAll("grid-columnCustomBlock", grid).map(column => {
      const title = Select.select("grid-columnCustomBlockHeading", column) || {
        children: []
      };
      const content = Select.select("grid-columnCustomBlockBody", column) || {
        children: []
      };

      const range = title.children
        .filter(c => c.type === "text")
        .map(c => c.value)
        .join("")
        .split("-")
        .filter(Boolean)
        .map(i => i.trim())
        .map(i => parseInt(i, 10))
        .filter(i => typeof i === "number" && !Number.isNaN(i));

      return {
        type: "element",
        tagName: "x-grid-column",
        properties: {
          start: range[0],
          end: range[1]
        },
        children: content.children.map(c => toHast(c))
      };
    })
  };

  return node;
};

/**
 * @fileoverview test
 * @author test-eslint-rule
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const requireIndex = require("requireindex");
const { marked } = require("marked");
//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

// import all rules in lib/rules
module.exports.rules = requireIndex(__dirname + "/rules");

/**
 * @type {import("eslint").Linter.Processor}
 */
const processor = {
  supportsAutofix: true,
  preprocess(text, filename) {
    const tokens = marked.lexer(text);
    const files = tokens
      .filter((t) => t.type === "code")
      .map((t, i) => {
        return { text: t.text, filename: i + ".js" };
      });
    return files;
  },
  postprocess(messages, filename) {
    return [].concat(...messages);
  },
};

module.exports.processors = {
  markdown: processor,
};

/**
 * @type RuleModule
 */
module.exports = {
  create: (context) => {
    var sourceCode = context.getSourceCode();
    const path = context.getFilename();
    return {
      VariableDeclarator: (node) => {
        const findParent = () => {
          let n = node.parent;
          while (n) {
            if (n.type === "BlockStatement") return node;
            if (n.type === "Program") return node;
            n = n.parent;
          }
          return null;
        };
        const parent = findParent();
        if (!parent) return;

        // find all references

        if (node.id.name.startsWith("$")) {
          const variables = context.getDeclaredVariables(node);
          const todos = variables.filter((v) => v.name === node.id.name).flatMap((v) => v.references);
          context.report({
            messageId: "dollar variable",
            data: {
              name: node.id.name,
            },
            node,
            suggest: [
              {
                desc: "Removd prefixed $",
                *fix(fixer) {
                  for (let todo of todos) {
                    yield fixer.replaceText(todo.identifier, node.id.name.substring(1))
                  }
                },
              },
            ],
          });
        }
      },
    };
  },
  meta: {
    hasSuggestions: true,
    type: "problem",
    messages: {
      "dollar variable": "Avoid using variables named '{{ name }}'",
    },
    schema: [],
  },
};

const templateStringQuotesRule = {
  meta: {
    type: "suggestion",
    docs: {
      description: "enforce template literals for specific JSX attributes",
      category: "Stylistic Issues",
      recommended: false
    },
    fixable: "code",
    schema: []
  },
  create(context) {
    return {
      JSXAttribute(node) {
        if (
          node.name.name === "className" &&
          node.value &&
          node.value.expression &&
          node.value.expression.type === "CallExpression" &&
          node.value.expression.callee.name === "clsx"
        ) {
          const sourceCode = context.getSourceCode();
          const text = sourceCode.getText(node);

          if (text.includes("styles['")) {
            context.report({
              node,
              message: "Use template literals for className with clsx and styles",
              fix(fixer) {
                const newText = text.replace(/'([^']+)'/g, "`$1`");
                return fixer.replaceText(node, newText);
              }
            });
          }
        }
      }
    };
  }
};

export default templateStringQuotesRule;

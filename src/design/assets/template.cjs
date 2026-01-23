const template = ({ imports, interfaces, componentName, props, jsx, exports }, { tpl }) => tpl`
/*  Code generated. DO NOT EDIT */
import { Ref, SVGProps, forwardRef } from 'react';
${interfaces}

export const ${componentName} = forwardRef((${props}) =>
  ${jsx}
);

${componentName}.displayName = "${componentName}";
`;

module.exports = template;

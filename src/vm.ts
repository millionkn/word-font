export default (global: { [key: string]: any }) => {
    return (script: string) => {
        new Function(script);
        return new Function(
            "proxy",
            `
              with(proxy){
                  "use strict";
                  ${script}
              }
          `
        )(new Proxy(global, { has: (target, key) => true }));
    };
};
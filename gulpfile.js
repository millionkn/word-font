const gulp = require("gulp");
const minimist = require('minimist');
const fs = require("fs");
const path = require("path");

gulp.task("createVueTemplate", fn => {
  let args = minimist(process.argv.slice(2), {
    string: "path"
  });
  if (args.path === undefined || args.path === "") { return fn("需要指定模板生成路径") }
  let dir = path.resolve(__dirname, args.path);
  try {
    fs.statSync(dir);
    return fn(`${dir}已存在`);
  } catch{
  }
  fs.mkdirSync(dir, { recursive: true });
  let basename = dir.split("\\").pop();
  fs.writeFileSync(`${dir}\\index.ts`,
    `import Template from "./${basename}.vue";

export * from "./${basename}";
export default Template;`);
  fs.writeFileSync(`${dir}\\${basename}.ts`,
    `import Vue from "vue";

export type propMethod = () => {
}
export default Vue.extend({
  props:["prop"],
  setup(propsInit) {
    let props = (propsInit.prop as propMethod)();
    return{
    };
  },
});`
  );
  fs.writeFileSync(`${dir}\\${basename}.vue`,
    `<template src="./${basename}.html"></template>
<style src="./${basename}.sass" lang="sass" scoped></style>
<script src="./${basename}.ts" lang="ts"></script>`
  );
  fs.writeFileSync(`${dir}\\${basename}.sass`, ``);
  fs.writeFileSync(`${dir}\\${basename}.html`, `<div>\n${basename}\n</div>`);
  fn();
})
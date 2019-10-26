import { Ref, toRefs } from '@vue/composition-api';
import Vue from 'vue';

export type UserData = {
  info: {
    username: string
  },
  component: Component[],
  lesson: Lesson[],
}
export type UploadReturnType = {
  code: string
}
export class Lesson {
  id!: string;
  showing!: boolean;
  owner!: string;
  info!: {
    name: string,
    message: string,
    image: string,
  }
  constructor(initObj: any) {
    deepAssignWithoutDefinedProperty(this, initObj, {
      id: "0",
      showing: false,
      owner: "0",
      info: {
        name: "",
        message: "",
        image: "",
      }
    })
  }
}

export type Word = {
  id: string,
  describe: string,
  data: {
    [key: string]: string
  }
}
function deepAssignWithoutDefinedProperty(target: Object & { [x: string]: any }, ...args: Object & { [x: string]: any }[]) {
  args.forEach((arg) => {
    Object.keys(arg).forEach((key) => {
      if (target.hasOwnProperty(key)) {
        if (typeof target[key] === "object" && typeof arg[key] === "object") {
          deepAssignWithoutDefinedProperty(target[key], arg[key])
        }
      } else if (typeof arg[key] === "object") {
        deepAssignWithoutDefinedProperty(target[key] = {}, arg[key])
      } else {
        target[key] = arg[key];
      }
    })
  })
}
export class Component {
  id!: string;
  uploader!: string;
  info!: {
    name: string,
    introduction: string,
  };
  constructor(initObj: any) {
    deepAssignWithoutDefinedProperty(this, initObj, {
      id: "0",
      uploader: "0",
      info: {
        name: "",
        introduction: "",
      }
    })
  }
}
export type Support = {
  id: string,
  componentId: string,
  wordId: string,
}
export type VueOption = typeof Vue.extend extends (option: infer X) => any ? X : never;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/users.ts
var users_exports = {};
__export(users_exports, {
  signIn: () => signIn,
  signUp: () => signUp,
  updateUser: () => updateUser,
  whoAmI: () => whoAmI
});
module.exports = __toCommonJS(users_exports);
var signIn = async () => {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(
      {
        message: "SignIn"
      },
      null,
      2
    )
  };
};
var signUp = async () => {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(
      {
        message: "SignUp"
      },
      null,
      2
    )
  };
};
var whoAmI = async () => {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(
      {
        message: "WhoAmI"
      },
      null,
      2
    )
  };
};
var updateUser = async () => {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(
      {
        message: "UpdateCurrentUser"
      },
      null,
      2
    )
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  signIn,
  signUp,
  updateUser,
  whoAmI
});

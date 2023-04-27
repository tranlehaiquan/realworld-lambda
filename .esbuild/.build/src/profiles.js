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

// src/profiles.ts
var profiles_exports = {};
__export(profiles_exports, {
  followUser: () => followUser,
  getProfile: () => getProfile,
  unFollowUser: () => unFollowUser
});
module.exports = __toCommonJS(profiles_exports);
var getProfile = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "GetProfile"
      },
      null,
      2
    )
  };
};
var followUser = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "followUser"
      },
      null,
      2
    )
  };
};
var unFollowUser = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "unFollowUser"
      },
      null,
      2
    )
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  followUser,
  getProfile,
  unFollowUser
});

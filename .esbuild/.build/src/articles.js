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

// src/articles.ts
var articles_exports = {};
__export(articles_exports, {
  addCommentToArticle: () => addCommentToArticle,
  createArticle: () => createArticle,
  deleteArticle: () => deleteArticle,
  deleteComment: () => deleteComment,
  favoriteArticle: () => favoriteArticle,
  getArticle: () => getArticle,
  getArticles: () => getArticles,
  getCommentsFromArticle: () => getCommentsFromArticle,
  getFeedArticles: () => getFeedArticles,
  getTags: () => getTags,
  unFavoriteArticle: () => unFavoriteArticle,
  updateArticle: () => updateArticle
});
module.exports = __toCommonJS(articles_exports);
var getArticles = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "GetArticles"
      },
      null,
      2
    )
  };
};
var getFeedArticles = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "GetFeedArticles"
      },
      null,
      2
    )
  };
};
var getArticle = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "GetArticle"
      },
      null,
      2
    )
  };
};
var createArticle = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Create Article"
      },
      null,
      2
    )
  };
};
var updateArticle = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "UpdateArticle"
      },
      null,
      2
    )
  };
};
var deleteArticle = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "DeleteArticle"
      },
      null,
      2
    )
  };
};
var addCommentToArticle = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "AddCommentToArticle"
      },
      null,
      2
    )
  };
};
var getCommentsFromArticle = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "GetCommentsFromArticle"
      },
      null,
      2
    )
  };
};
var deleteComment = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "DeleteComment"
      },
      null,
      2
    )
  };
};
var favoriteArticle = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "FavoriteArticle"
      },
      null,
      2
    )
  };
};
var unFavoriteArticle = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "UnFavoriteArticle"
      },
      null,
      2
    )
  };
};
var getTags = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "get task"
      },
      null,
      2
    )
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addCommentToArticle,
  createArticle,
  deleteArticle,
  deleteComment,
  favoriteArticle,
  getArticle,
  getArticles,
  getCommentsFromArticle,
  getFeedArticles,
  getTags,
  unFavoriteArticle,
  updateArticle
});

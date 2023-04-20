// GET articles
export const getArticles = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "GetArticles",
      },
      null,
      2
    ),
  };
};

// GET articles/feed
export const getFeedArticles = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "GetFeedArticles",
      },
      null,
      2
    ),
  };
};

// GET articles/:slug
export const getArticle = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "GetArticle",
      },
      null,
      2
    ),
  };
};

// POST articles
export const createArticle = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Create Article",
      },
      null,
      2
    ),
  };
};

// PUT articles/:slug
export const updateArticle = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "UpdateArticle",
      },
      null,
      2
    ),
  };
};

// DELETE articles/:slug
export const deleteArticle = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "DeleteArticle",
      },
      null,
      2
    ),
  };
};

// POST articles/:slug/comments
export const addCommentToArticle = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "AddCommentToArticle",
      },
      null,
      2
    ),
  };
};

// GET articles/:slug/comments
export const getCommentsFromArticle = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "GetCommentsFromArticle",
      },
      null,
      2
    ),
  };
};

// DELETE articles/:slug/comments/:id
export const deleteComment = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "DeleteComment",
      },
      null,
      2
    ),
  };
};

// POST articles/:slug/favorite
export const favoriteArticle = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "FavoriteArticle",
      },
      null,
      2
    ),
  };
};

// DELETE articles/:slug/favorite
export const unFavoriteArticle = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "UnFavoriteArticle",
      },
      null,
      2
    ),
  };
};

// GET tags
export const getTags = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "GetTags",
      },
      null,
      2
    ),
  };
};

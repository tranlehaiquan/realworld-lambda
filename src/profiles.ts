// GET profiles/:username
export const getProfile = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "GetProfile",
      },
      null,
      2
    ),
  };
}

// POST profiles/:username/follow
export const followUser = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "followUser",
      },
      null,
      2
    ),
  };
}

// DELETE profiles/:username/follow
export const unFollowUser = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "unFollowUser",
      },
      null,
      2
    ),
  };
}
// POST signIn
export const signIn = () => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "SignIn",
      },
      null,
      2
    ),
  };
};

// POST signUp
export const signUp = () => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "SignUp",
      },
      null,
      2
    ),
  };
}

// GET whoAmI
export const whoAmI = () => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "WhoAmI",
      },
      null,
      2
    ),
  };
}

// PUT user
export const updateUser = () => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "UpdateCurrentUser",
      },
      null,
      2
    ),
  };
}


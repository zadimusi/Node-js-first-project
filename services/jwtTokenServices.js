const { sign } = require("jsonwebtoken");

const User = require("../model/User");

const getJwtTokens = async ({ id, email }, updateToken = false) => {
  console.log(updateToken, "updateToken")
  const body = { id, email };
  const token = sign({ user: body },  process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });

  const refereshToken = sign({ user: body }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "1D",
  });

  // const refereshToken = sign({ user: body }, "TOP_SECRET", {
  //   expiresIn: "1D",
  // });

  // update refresh token only logins and signups
  if (updateToken) {
    //we can store the refresh token in db coz if it will steal anyhow (not possible) then secret key only available for access token only not refresh secret key
    await User.findOneAndUpdate(
      {
        _id: body.id,
      },
      { refreshToken: refereshToken },
      { upsert: true }
    );
  }

  return {
    token,
    refereshToken,
  };
};

module.exports = { getJwtTokens };

/**
 * Below are the steps to do revoke your JWT access token (flow of access token and refresh token):
 *
 * 1. When you do log in, send 2 tokens (Access token, Refresh token) in response to the client.
 * 2. The access token will have less expiry time and Refresh will have long expiry time.
 * 3. The client (Front end) will store refresh token in an httponly cookie and access token in local storage.
 * 4. The client will use an access token for calling APIs. But when it expires, you call auth server API to get the new token (refresh token is automatically added to http request since it's stored in cookies).
 * 5. Your auth server will have an API exposed which will accept refresh token and checks for its validity and return a new access token.
 * 6. Once the refresh token is expired, the User will be logged out.
 * */

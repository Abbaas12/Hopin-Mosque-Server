const jwt = require("express-jwt");

function authjwt() {
  const secret = process.env.SECRET;
  const api = process.env.API_URL;
  return jwt({
    secret,
    algorithms: ["HS256"],
    isRevoked,
  }).unless({
    path: [
      { url: /\/api\/v1\/prayertimes(.*)/, methods: ["GET", "OPTION"] },
      { url: /\/api\/v1\/fastings(.*)/, methods: ["GET", "OPTION"] },
      { url: /\/api\/v1\/advertisings(.*)/, methods: ["GET", "OPTION"] },
      { url: /\/api\/v1\/jamaeaes(.*)/, methods: ["GET", "OPTION"] },
      { url: /\/api\/v1\/users(.*)/, methods: ["GET", "OPTION"] },
      `${api}/users/login`,
    ],
  });
}

module.exports = authjwt;

async function isRevoked(req, payload, done) {
  if (!payload.isAdmin) done(null, true);
  done();
}

const router = require("koa-router")();
const { SECRET } = require("../config");
const jsonwebtoken = require("jsonwebtoken");
const user = require('../model/user')
const { User } = user

router.post("/login", async (ctx, next) => {
  let {
    request: {
      fields: { email, password, visitorData },
    },
  } = ctx;
  // let registList = await query(`SELECT * FROM user WHERE email = "${email}"`);
  let regist = await User.findOne({
    where: {
      email
    },
    raw: true
  })
  if (!regist) await user.regist(email, password, visitorData);

  // let res = await query(
  //   `SELECT * FROM user WHERE email = "${email}" AND password = "${password}"`
  // );
  let matchUser = await User.findOne({
    where: {
      email,
      password
    },
    raw: true
  })

  if (!matchUser) {
    // ctx.status = 404;
  } else {
    ctx.body = {
      ...matchUser,
      token: jsonwebtoken.sign(
        { name: matchUser.email, id: matchUser.id }, // 加密userToken
        SECRET,
        { expiresIn: "2h" }
      ),
    };
  }

  await next();
});

router.get("/info", async (ctx, next) => {
  let id = ctx.req.decoded.id;
  // let res = await query(`SELECT * FROM user WHERE id = "${id}"`);
  let info = await User.findOne({
    where: {
      id
    },
    raw: true
  });
  ctx.body = info;

  await next();
});

module.exports = router;

const router = require("koa-router")();
const { SECRET } = require("../config");
const jsonwebtoken = require("jsonwebtoken");
const user = require("../model/user");
const { User } = user;

router.post("/login", async (ctx, next) => {
  let {
    request: {
      fields: { email, password, visitorData },
    },
  } = ctx;
  let regist = await User.findOne({
    where: {
      email,
    },
    raw: true,
  });
  if (!regist) await user.regist(email, password, visitorData);

  let matchUser = await User.findOne({
    where: {
      email,
      password,
    },
    raw: true,
  });

  if (!matchUser) {
    ctx.status = 404
    ctx.body = {
      msg: 'password error'
    }
  } else {
    ctx.body = {
      ...matchUser,
      token: jsonwebtoken.sign(
        { name: matchUser.email, id: matchUser.id }, // 加密userToken
        SECRET,
        { expiresIn: "24h" }
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
      id,
    },
    raw: true,
  });
  ctx.body = info;

  await next();
});

router.put("/last-edit-project", async (ctx, next) => {
  let id = ctx.req.decoded.id;
  let projectId = ctx.request.fields.projectId;

  await User.update(
    {
      "last_edit_project": projectId,
    },
    {
      where: {
        id,
      },
    }
  );

  ctx.body = {
    msg: 'last-edit-project has changed to ' + projectId
  }

  await next();
});

module.exports = router;

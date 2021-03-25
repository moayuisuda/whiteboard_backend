const Koa = require("koa");
const app = new Koa();
const cors = require("koa2-cors");
const router = require("./router");
const bodyparser = require("koa-better-body");
const { SECRET } = require("./config");
const jsonwebtoken = require("jsonwebtoken");


app.use(cors());
app.use(bodyparser());

app.use(async (ctx, next) => {
  if (ctx.request.url === "/user/login") await next();
  else {
    try {
      let decoded = await jsonwebtoken.verify(ctx.req.headers["token"], SECRET);
      console.log({ decoded });
      ctx.req.decoded = decoded;
      try {
        await next();
      } catch (e) {
        console.log(e)
        ctx.status = 500;
        ctx.body = e.message;
      }
    } catch (e) {
      console.log(e)
      ctx.status = 401;
      ctx.body = e.message;
    }
  }
});

app.use(router.routes());

app.listen(3000, () => {
  console.log("server is starting at port 3000");
});

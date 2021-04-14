const router = require("koa-router")();
const fs = require("fs");
const { v4 } = require("uuid");

router.put("/upload", async (ctx, next) => {
  let {
    request: { files },
  } = ctx;

  const file = files[0];
  let path = '/images' + v4() + "." + file.type.split("/")[1];
  const buffer = fs.readFileSync(file.path);
  fs.writeFileSync("./public" + path, buffer);

  ctx.body = path;

  await next();
});

module.exports = router;

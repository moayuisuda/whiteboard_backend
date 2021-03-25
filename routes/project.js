const router = require("koa-router")();
const { Project } = require("../model/project");
const { User } = require("../model/user");

router.get("/data/:id", async (ctx, next) => {
  let id = ctx.params.id;

  // let res = await query(`SELECT * FROM project WHERE id = "${id}"`);
  const data = await Project.findOne({
    where: {
      id,
    },
    raw: true,
  });
  ctx.body = data;

  await next();
});

router.get("/project-list", async (ctx, next) => {
  let id = ctx.req.decoded.id;
  // let projects = await query(`SELECT projects FROM user WHERE id = "${id}"`);

  const user = await User.findOne({
    where: {
      id,
    },
    raw: true,
  });
  let idList = user.projects.split(",");
  // let res = await query(`
  // SELECT projects FROM user WHERE id = "${id}"
  // ${list}
  // `);
  const projectList = await Project.findAll({
    where: {
      id: [...idList],
    },
    raw: true,
  });
  console.log("list----------", projectList);

  ctx.body = projectList;

  await next();
});

module.exports = router;

const router = require("koa-router")();
const project = require("../model/project");
const { Project } = project;
const user = require("../model/user");
const { User } = user;

router.get("/data/:id", async (ctx, next) => {
  let id = ctx.params.id;

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

  const user = await User.findOne({
    where: {
      id,
    },
    raw: true,
  });
  let idList = user.projects.split(",");
  const projectList = await Project.findAll({
    where: {
      id: [...idList],
    },
    raw: true,
  });

  ctx.body = projectList;

  await next();
});

router.post("/add", async (ctx, next) => {
  let id = ctx.req.decoded.id;

  const user = await User.findOne({
    where: {
      id,
    },
    raw: true,
  });
  let projects = user.projects.split(",");

  const newProjectId = await project.create();
  projects.push(newProjectId);
  const newProjectsStr = projects.join(",");
  await User.update(
    {
      projects: newProjectsStr,
    },
    {
      where: {
        id,
      },
    }
  );

  ctx.body = {
    msg: "add success",
  };

  await next();
});

router.put("/save", async (ctx, next) => {
  let {
    request: {
      fields: { id, data },
    },
  } = ctx;

  await Project.update(
    {
      data: JSON.stringify(data),
    },
    {
      where: {
        id,
      },
    }
  );

  ctx.body = {
    msg: "save success",
  };

  await next();
});

router.delete("/dele/:id", async (ctx, next) => {
  let {
    req: {
      decoded: { id: userId },
    },
    params: { id },
  } = ctx;

  const user = await User.findOne({
    where: {
      id: userId,
    },
    raw: true,
  });
  let projects = user.projects.split(",");
  projects.splice(projects.indexOf(id), 1);

  await User.update(
    {
      projects: projects.join(","),
    },
    {
      where: {
        id,
      },
    }
  );

  await Project.destroy({
    where: {
      id,
    },
  });

  ctx.body = {
    msg: "delete success",
  };

  await next();
});

module.exports = router;
